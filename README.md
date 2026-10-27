# baenest.com

Static site for BaeNest (plain HTML/CSS/JS, no build). Hosted on GitHub Pages.

- `/` landing · `/join/?code=ABC123` invite page · `/privacy/` · `/terms/` · `404.html`
- `.well-known/assetlinks.json` Android App Links for `com.baenest.app`
- `assets/og-image.svg` is the source of `og-image.jpg` (1200×630 link preview)

Local preview: `python -m http.server 8767` in this folder, then open http://localhost:8767.

## TODO before launch
- Fill every `TODO` in `privacy/` and `terms/`.
- Replace `TODO_DEBUG_SHA256` / `TODO_RELEASE_SHA256` in `.well-known/assetlinks.json`:
  - Debug: `cd android && ./gradlew signingReport` → `SHA-256` under `Variant: debug`.
  - Release: Play Console → your app → Test and release → App integrity → App signing →
    **App signing key certificate** SHA-256 (Play re-signs your app with this key).
    Also add the **Upload key** SHA-256 if you sideload release builds signed with it.
  - Format: uppercase hex pairs with colons, e.g. `"AB:CD:..."`. Remove the debug one for production if you like.
- Check with Google's tester once live:
  https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://baenest.com&relation=delegate_permission/common.handle_all_urls

## Deploy (GitHub Pages)
1. Create an empty public repo on GitHub (e.g. `baenest-site`), no README/license.
2. Push:
   ```
   git remote add origin https://github.com/<you>/baenest-site.git
   git push -u origin main
   ```
3. Repo → Settings → Pages → Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)` → Save.
4. Same page → Custom domain: `baenest.com` → Save (the `CNAME` file already matches).
5. DNS at your registrar for `baenest.com`:

   | Type  | Host | Value |
   |-------|------|-------|
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |
   | AAAA  | @    | 2606:50c0:8000::153 (optional, also 8001/8002/8003::153) |
   | CNAME | www  | `<you>.github.io` |

   Remove any other A/AAAA/CNAME records on `@` and `www` (e.g. registrar parking).
6. Optional but recommended: GitHub → your profile Settings → Pages → **Add a verified domain** (TXT record) to stop domain takeover.
7. Wait for the DNS check to pass (minutes to a few hours), then tick **Enforce HTTPS**.
8. Verify: https://baenest.com, https://www.baenest.com (redirects), https://baenest.com/.well-known/assetlinks.json (must be `200`, `application/json`, no redirect).
