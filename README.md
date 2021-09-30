# Lerna Tag Parser

[![actions-workflow-test][actions-workflow-test-badge]][actions-workflow-test]
[![release][release-badge]][release]
[![license][license-badge]][license]

This is a GitHub Action parse Lerna tags.
It provides publishes and deploys packages independently.

## Ouput
Provide next output values:
- `scope`
- `package_name`
- `version`

Set next env variables:
- `LERNA_PACKAGE_SCOPE`
- `LERNA_PACKAGE_NAME`
- `LERNA_PACKAGE_VERSION`

## Output Examples

### With Scope Tag `@mycompany/my-package@0.0.1`
Output values
- `steps.<step.id>.outputs.scope` => `@mycompany`
- `steps.<step.id>.outputs.package_name` => `my-package`
- `steps.<step.id>.outputs.version` => `0.0.1`

Set env
- `env.LERNA_PACKAGE_SCOPE` => `@mycompany`
- `env.LERNA_PACKAGE_NAME` => `my-package`
- `env.LERNA_PACKAGE_VERSION` => `0.0.1`



### Without Scope Tag `my-package@0.0.1`
Output values
- `steps.<step.id>.outputs.scope` => `''`
- `steps.<step.id>.outputs.package_name` => `my-package`
- `steps.<step.id>.outputs.version` => `0.0.1`

Set env
- `env.LERNA_PACKAGE_SCOPE` => `''`
- `env.LERNA_PACKAGE_NAME` => `my-package`
- `env.LERNA_PACKAGE_VERSION` => `0.0.1`


## Example

```yaml
name: Deploy Lerna Packages

on:
  push:
    tags:
      - '*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: igor-lemon/lerna-package-tag@0.0.2
        id: lerna-package
        
      - name: Build and deploy the Core SDK
        if: ${{ steps.lerna-package.outputs.package_name == 'core-sdk' }}
        run: |
          echo "[CORE SDK] Start Deploy ${{ env.LERNA_PACKAGE_NAME }} v${{ env.LERNA_PACKAGE_VERSION }}, with ${{ env.LERNA_PACKAGE_SCOPE }} scope"
            
      - name: Build and deploy the Public SDK
        if: ${{ steps.lerna-package.outputs.package_name == 'public-sdk' }}
        run: |
          echo "[PUBLIC SDK] Start Deploy ${{ env.LERNA_PACKAGE_NAME }} v${{ env.LERNA_PACKAGE_VERSION }}, with ${{ env.LERNA_PACKAGE_SCOPE }} scope"
```

<!-- badge links -->
[actions-workflow-test]: https://github.com/igor-lemon/lerna-package-tag/actions?query=workflow%3ATests
[actions-workflow-test-badge]: https://img.shields.io/github/workflow/status/igor-lemon/lerna-package-tag/Tests?label=Tests&style=for-the-badge&logo=github

[release]: https://github.com/igor-lemon/lerna-package-tag/releases
[release-badge]: https://img.shields.io/github/v/release/igor-lemon/lerna-package-tag?style=for-the-badge&logo=github

[license]: LICENSE
[license-badge]: https://img.shields.io/github/license/igor-lemon/lerna-package-tag?style=for-the-badge
