# Vendored image-size security patch

This directory contains only the `image-size/fromFile` runtime required by
`@docusaurus/mdx-loader`. The runtime is copied from the published
`image-size@2.0.2` package and versioned locally as `2.0.3`.

Source package integrity:
`sha512-IRqXKlaXwgSMAMtpNzZa1ZAe8m+Sa1770Dhk8VkSsP9LS+iHD62Zd8FQKs8fbPiagBE7BzoFX23cxFnwshpV6w==`

The HEIF and JXL loop guards apply the upstream bounded-progress fix from
image-size/image-size pull request 439, commit
`bdbe560bfd98af6feab93b46aed67f2f0a77e4d5`. The equivalent ICNS loop receives
the same zero-length-entry protection. `scripts/test-vendored-image-size.mjs`
keeps regression cases behind hard process timeouts so a future reintroduction
fails instead of hanging the test run.
