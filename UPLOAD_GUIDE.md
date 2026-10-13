# Thomson Reserve V9.8 — GitHub upload guide
Prepared 14 October 2026. Buyer reports have been removed.

## Choose your package
- Already uploaded the complete V9.7 website? Use **Thomson_Reserve_V9_8_Update_From_V9_7.zip**. Extract it and copy all its contents into the same publishing folder, replacing matching files. Your existing assets folder stays in place. This small update includes no replacement images.
- Starting fresh, or unsure whether V9.7 is complete? Use **Thomson_Reserve_GitHub_Upload_V9_8.zip**, which contains the complete website and all images.
- Commit the changed files in GitHub Desktop, then Push origin. Preserve the folder structure and the branch/folder configured in Settings → Pages.
- After Pages deploys, refresh with Ctrl+F5. The footer should show PRIVATE V9.8, the Buyer FAQs should be visible and release.json should show private-v9.8-seo-responsive.

## Which file to use
Extract **Thomson_Reserve_GitHub_Upload_V9_8.zip** using Windows **Extract All**. Upload the extracted website files, including the assets folder. Do not upload the ZIP itself or the large standalone HTML.

Your existing page loaded its HTML but returned 404 for required scripts and styles. The complete folder fixes that missing-file problem.

This is still a private review build. Public distribution rights for developer drawings and artwork have not been established. Publish those materials only once authorised. A “private preview” label does not restrict access. A public repository exposes source files; GitHub Pages may also be public even for a private repository.

## Recommended: GitHub Desktop
1. Open GitHub Desktop and sign in. Choose **File → Clone repository → URL**. Enter https://github.com/shannonluiz78/thomsonreserve-3D and choose a local folder. If already cloned, select that repository and fetch/pull its latest changes first.
2. In the repository's GitHub website, check **Settings → Pages** to find the current publishing branch and folder. This package works with **Deploy from a branch** and either **/(root)** or **/docs**. If the site uses an existing Actions workflow, inspect its upload directory before changing it.
3. Keep a backup of the existing website outside the repository. Copy the extracted package's **contents** into the publishing folder, replacing matching filenames. Keep the repository's .git folder and any unrelated files. Do not create an extra nesting folder called Thomson_Reserve_GitHub_Upload_V9_8 inside the publishing folder.
4. Check that index.html, payment-core.js, funnel-ui.js and assets/ are together in that folder. The entire assets/furnished/ and assets/plans/ folders are required.
5. In GitHub Desktop review the changed files. Do not add the private Work Package, old report PDFs, evidence folders, credentials or standalone HTML. Commit with a clear title such as “Update unit explorer, pricing and furnishing; remove reports”.
6. Once the content is cleared for publication, **Push origin**. Follow existing branch protections if shown. If using branch publication, Settings → Pages should point to the branch you pushed and the correct root/docs folder; save if needed.
7. In GitHub's **Actions** tab, wait for the Pages build/deployment to succeed. Then open https://shannonluiz78.github.io/thomsonreserve-3D/ and refresh with Ctrl+F5.

Copy layout when Pages serves the repository root:
    thomsonreserve-3D/
      index.html
      .nojekyll
      payment-core.js
      payment-ui.js
      funnel-core.js
      funnel-ui.js
      ...other supplied .js and .css files
      assets/
        furnished/
        plans/
        ...supporting images and Three.js
      licenses/
      release.json

## Browser upload alternative
GitHub's web uploader accepts at most 100 files per upload, each no larger than 25 MiB. This package has more than 100 files, so GitHub Desktop is easier. If using the web uploader:
1. Upload the top-level files and licenses folder at the publishing root.
2. Upload the assets folder's files and its two subfolders in batches of at most 100 files, preserving assets/furnished and assets/plans. Navigate to the intended repository folder before uploading; never flatten images into the root.
3. Include .nojekyll (Windows may hide dotfiles). Commit each batch and wait until all batches are present before testing.
4. If choosing a new branch, merge it into the branch configured for Pages after reviewing its complete contents. Uploading files to a different branch does not update the published page.

## Five-minute check after upload
- Footer identifies PRIVATE V9.8 and there are no buyer-report buttons or contact-gate forms.
- https://shannonluiz78.github.io/thomsonreserve-3D/release.json shows version private-v9.8-seo-responsive.
- https://shannonluiz78.github.io/thomsonreserve-3D/payment-core.js returns JavaScript text, not a 404 page.
- Choose Block 1, Stack 04, level 13: estimated price should be S$2,218,000 under Reference PSF. At 75% LTV, 2% interest and 25 years, monthly payment rounds to S$7,051.
- Compare original BPS1 and proposed furnishing side by side, then choose a patio variant and another bedroom category. Images should load.
- Complete quiz with S$1.8m, 3–4 people and minimum 3 bedrooms: no within-budget match under the default price model.
- Add a unit to shortlist; View shortlist opens comparison. WhatsApp drafts go to +65 8980 9229. Review without sending during testing.
- Check on a mobile phone: floor selector, furnishing, payment inputs and sticky WhatsApp action remain usable.

## If something fails
Blank tools usually mean a missing script or incorrect path. Check release.json and payment-core.js first. Broken pictures mean the matching assets path/case is missing. Old content usually means the wrong branch/folder, an incomplete deployment or cached files. If the map provider is unavailable, the labelled offline fallback remains; a working fallback does not prove live OneMap availability.

The upload directory is a static site: no installation, build command, secret key or backend is required. No CRM, live AI, report generation or automatic follow-up is connected. Quiz and comparison still work; WhatsApp opens a draft that the buyer sends manually.

## Contents and limitations
77 detailed ChatGPT furnishing concepts cover all 1,268 scheduled homes; 41 original floorplan sheets remain available. Images are illustrative, not dimension-certified. D1p and BPS3p(L) patio-gate details still differ; see the individual image notes. Actual availability and developer unit prices remain unknown.

Default pricing follows the requested Rex Tan reference: (S$2,850 + S$15 × (floor − 1)) × printed sqft, rounded to the nearest S$1,000. The earlier category estimate + S$5,000/floor and manual PSF remain separate selectable scenarios.

## Official GitHub help
Checked 13 October 2026:
- [Configure Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Clone with GitHub Desktop](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)
- [Upload files and limits](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)


## SEO and device update
Read SEO_AND_MOBILE_NOTES.md for Search Console setup and indexing limits. Check release.json for private-v9.8-seo-responsive and confirm Buyer FAQs are visible. Phone and iPad layouts include larger inputs, touch controls and stacked comparisons.
