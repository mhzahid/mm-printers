# Laravel inquiry endpoint

With `INQUIRY_DRIVER=laravel`, the Next.js route `/api/inquiry` validates the submission
(honeypot, timing check, per-IP rate limit, Zod schema) and then forwards it server-to-server
to `LARAVEL_INQUIRY_URL` with `Authorization: Bearer LARAVEL_INQUIRY_TOKEN`.
The token never reaches the browser.

## Payload (JSON)

```json
{
  "name": "Rahim Uddin",
  "email": "rahim@example.com",
  "message": "We need 20,000 hang tags…",
  "inquiryType": "quotation",          // product | quotation | custom | manufacturing | packaging | other
  "company": "", "phone": "", "country": "",
  "productCategory": "tags-cards-stickers",
  "product": "hang-tag",               // product slug
  "productName": "Hang Tag",
  "quantity": "20,000 pcs",
  "deliveryDate": "2027-01-15",        // YYYY-MM-DD or ""
  "submittedAt": "2026-10-18T10:11:52.673Z",
  "source": "mmprinters.net/contact"
}
```

Respond with any 2xx and optionally `{ "reference": "INQ-0001" }` — the reference is shown
to the visitor. Any non-2xx makes the form show "Your inquiry could not be sent" (nothing is
reported as sent unless Laravel accepted it).

## Minimal Laravel implementation

```php
// routes/api.php
Route::post('/inquiries', [InquiryController::class, 'store'])
    ->middleware(['inquiry.token', 'throttle:30,1']);
```

```php
// app/Http/Middleware/VerifyInquiryToken.php
public function handle(Request $request, Closure $next)
{
    abort_unless(hash_equals((string) config('services.inquiry.token'), (string) $request->bearerToken()), 401);
    return $next($request);
}
// register alias 'inquiry.token' in bootstrap/app.php; config/services.php: 'inquiry' => ['token' => env('INQUIRY_TOKEN')]
```

```php
// app/Http/Controllers/InquiryController.php
public function store(Request $request)
{
    $data = $request->validate([
        'name' => 'required|string|min:2|max:120',
        'email' => 'required|email:rfc|max:160',
        'message' => 'required|string|min:10|max:5000',
        'inquiryType' => 'required|in:product,quotation,custom,manufacturing,packaging,other',
        'company' => 'nullable|string|max:160',
        'phone' => ['nullable', 'string', 'max:40', 'regex:/^[+()\d\s.-]*$/'],
        'country' => 'nullable|string|max:80',
        'productCategory' => 'nullable|string|max:60',
        'product' => 'nullable|string|max:120',
        'productName' => 'nullable|string|max:160',
        'quantity' => 'nullable|string|max:80',
        'deliveryDate' => 'nullable|date_format:Y-m-d',
    ]);

    $inquiry = Inquiry::create($data);                       // migration with matching columns
    Mail::to('Info@mmprinters.net')->queue(new NewInquiry($inquiry));

    return response()->json(['reference' => sprintf('INQ-%04d', $inquiry->id)], 201);
}
```

## File attachments

Attachments are not implemented. The form asks visitors to email reference files after
submitting. To add uploads safely: accept multipart in a dedicated Laravel endpoint, restrict
MIME types (PDF, PNG, JPG, AI/EPS if needed) and size, store outside the public disk, scan if
possible, and link files to the inquiry record.
