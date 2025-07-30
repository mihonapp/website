---
title: Downloads
titleTemplate: Frequently Asked Questions
description: Frequently Asked Question about Downloads.
---

# Downloads
Frequently Asked Question about Downloads.

## How do I download multiple chapters or series at the same time?
The app does not support parallel downloads from a single source to prevent potential IP bans due to excessive requests.
While this might impact speed, it's preferable over rendering a source inaccessible.

Note that Mihon will download from up to five different sources in parallel.

## Why did my downloads stop midway?
Downloads stopping midway may be related to network connection issues or source problems.
**Mihon** will provide notifications regarding encountered errors during download attempts.

## Why can't I see my downloads?
Downloads might not be detected due to multiple factors:

* Inaccessibility of the download location.
  > Ensure the SD card is properly detected if in use.
* Source name changes.
  > Rename the source's folder to match the new name.
* Series title modified by the source.
  > Adjust the folder title to the updated name.

## How do I manage what's downloading?
Navigate to <nav to="download-queue"> to interact with queued downloads.

Cancel all items by clicking the **Overflow** button beside a series chapter or the top right corner.

To reorder the queue, long-press and drag the `=` icon next to a queue item.

## Can I use both internal storage and external SD card storage?
No, you must choose a single location. Internal storage performs better than external SD cards.

## Why does my device photo gallery contain series pages?
**Mihon** typically prevents series pages in downloads from appearing in your device's photo gallery by default through a `.nomedia` file.
However, in some cases, this might not function as intended.

A quick solution is to create the `.nomedia` file yourself, name it as such, and place it in your downloads folder. If the issue pertains to local source, put the `.nomedia` file in the respective local folder.

## How are downloads organized on the filesystem?
They are stored as `downloads/Source Name/Manga Name/Chapter Name (abcdef).cbz`.
The `abcdef` string is the first 6 hexadecimal digits of the MD5 hash of the URL of the chapter, so that if two chapters have the same name, they won't try to write to the same filename.
In the case of a scanlator, it is `Scanlator Name_Chapter Name` instead of just `Chapter Name`.

Because of the prevalence of operating systems like Windows which have arbitrary limitations on special characters in filenames, by default Mihon will avoid using certain characters in filenames, specifically: `"*:<>?\|`.
Of course, `/` is also banned.
All of these characters are replaced by underscores if they appear in source, manga, chapter, or scanlator names.

Some users have reported using exceptionally buggy operating systems which also have problems with other Unicode characters, such as (but not necessarily limited to) emojis.
If you must use Mihon with such an operating system, you can enable the option in the advanced settings for "Disallow non-English filenames", which will prevent any non-English (non-ASCII) characters from being used in filenames.
Such characters will be replaced with their hexadecimal representations instead.
The special characters mentioned above are still replaced with underscores, if present, rather than hexadecimal.

None of the above considerations affect the way series and chapters are displayed in Mihon, which is based on their metadata rather than filenames.
Because the local source reads comic metadata files, if present, its functioning is also not affected by filename changes if you convert an external source download directory into a local source directory.
