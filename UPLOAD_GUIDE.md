# Thomson Reserve V9.9 — GitHub upload guide
Prepared 14 October 2026.

## Choose one download
- Already have the complete V9.7 or V9.8 website? Use **Thomson_Reserve_V9_9_Update_From_V9_7_or_V9_8.zip**. This includes the changed code and SEO files. Keep your existing assets folder.
- Starting fresh or unsure whether the earlier upload is complete? Use **Thomson_Reserve_GitHub_Upload_V9_9.zip**, which includes the whole website and all images.

## Update with GitHub Desktop
1. Open the existing **thomsonreserve-3D** repository in GitHub Desktop. Select **Repository → Show in Explorer**.
2. Extract your chosen ZIP into a temporary folder. Open that folder: you should see **index.html** directly inside it.
3. Copy all extracted contents into the folder that currently serves the website. Replace matching files. Keep the assets folder and its subfolders. Copy the contents, not an extra enclosing folder. Do not alter the repository’s .git folder.
4. Return to GitHub Desktop. Review the changes and enter **Update buyer layout to V9.9** as the commit summary.
5. Click **Commit to main** (or your configured Pages branch), then **Push origin**.
6. In GitHub, confirm **Settings → Pages** still points to the branch and folder containing your index.html. For a root-based site use the existing branch and **/ (root)**. If the site uses /docs, copy the website there instead; do not change a working Pages setup unnecessarily.
7. Wait for the Pages deployment to complete in **Actions**. Open the site and refresh with **Ctrl+F5**. On a phone, close/reopen the tab or clear this site’s cached files if it still shows the old layout.

## Check your upload
- Footer shows **PRIVATE V9.9** and release.json shows **private-v9.9-buyer-layout**.
- The larger Thomson Reserve masthead and TR mark appear at the top.
- On desktop or landscape tablet at least 980px wide, the unit selector is immediately to the right of the 3D map. Smaller screens stack the panels.
- The three Morning/Noon/Afternoon shortcut buttons are gone. The time slider still adjusts the shadow preview.
- The buyer note explains the site’s purpose and indicative information. Competitor sales links are removed. IRAS tax guidance and map-provider attribution remain.
- Select BPS1, Block 1, #13-04: the default estimate remains **S$2,218,000**. Check the corresponding original plan and furnished concept.
- Quiz, shortlist, comparison, payment estimate and WhatsApp links work. Reports remain removed. WhatsApp opens a draft; no automatic message is sent.

## If an upload fails
- **No space left on device:** free local drive space first. The LF/CRLF line-ending message is a warning; lack of disk space causes the commit failure. Keep website originals and do not delete .git to fix this.
- **Missing images or blank sections:** use the full ZIP, preserve the folder structure and upload all files together. A single index.html is not the complete website.
- **Old version still appears:** check that the deployment succeeded and that you copied files into the correct publishing folder; refresh without the old cache.

## Search and public use
Existing SEO metadata, eight buyer FAQs, structured data and sitemap remain. The canonical address is https://shannonluiz78.github.io/thomsonreserve-3D/. After deployment, submit its sitemap.xml through your verified Google Search Console property. Rankings and AI citations are not guaranteed.

This release does not publish anything automatically. The private-preview label is not access control: GitHub Pages is publicly accessible. Clear image permissions before public distribution. All prices remain estimates, areas approximate and AI furnishing geometry unverified. Use the latest developer documents to confirm final details.

## Verification
Eight simulated viewport sizes passed (320, 390, 430, 768, 820, 1024, 1180 and 1440 pixels), plus 10 local HTTP payment/asset checks and the report-free buyer journey. All 77 illustration pairs and 1,268 unit records are preserved. Tests used Edge/Chromium; physical iPhone/iPad Safari and real-world performance have not been tested.
