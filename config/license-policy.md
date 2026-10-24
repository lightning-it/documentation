# Spelling dictionary license exception

The dependency license checker permits only `@cspell/dict-de-de@4.1.3` with
license identifier `LGPL-3.0` as a directly pinned development dependency for
German documentation spelling checks. The general prohibited-license policy
remains unchanged. Another package, version, license expression, missing license
text or runtime dependency does not qualify for this exception.

The dictionary is imported by CSpell. Its data is not embedded in documentation
pages or application code. Checked document text keeps its own license. The
repository's first-party license remains MIT.

The installed package is unchanged. Its upstream license texts and attribution
continue to be retained by the existing generated third-party notices. The
license evidence explicitly records the scoped exception. Before distributing
the dictionary itself, including it in a tooling image, review the corresponding
source availability and applicable LGPL distribution obligations; this exception
does not grant blanket redistribution approval.

Upstream package source:
[German dictionary at the packaged revision](https://github.com/streetsidesoftware/cspell-dicts/tree/cd617963798222602ed78cffbb102ebc51af4534/dictionaries/de_DE).
The npm lockfile pins the package archive and integrity. Version updates require
an explicit exception review.

German spelling is enabled for the IHR template. Other documents retain their
existing language settings. A small set of reviewed technical terms remains in
the CSpell override; there is no repository-owned German dictionary or generated
word list.

## Reviewed permissive tooling licenses

The updated Markdown checker uses `argparse@3.0.4`, whose packaged license is
`PSF-2.0`. Its retained license text matches the
[SPDX Python Software Foundation License 2.0](https://spdx.org/licenses/PSF-2.0.html).
This license permits use and distribution with retained notices and requires a
summary when distributing modifications. The dependency is used unchanged; the
existing attribution generator retains its license text. The checker recognizes
this identifier alongside `Python-2.0`; prohibited licenses and the separate
spelling-dictionary exception remain unchanged.
