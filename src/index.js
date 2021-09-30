import github from "@actions/github";
import core from "@actions/core";
import parse from "./parse";

async function runAction() {
  try {
    core.debug(`Context REF => ${github.context.ref}`);

    const packageInfo = parse(github.context.ref)

    core.debug(`Parsed Info from Ref => ${JSON.stringify(packageInfo)}`)

    if (!packageInfo) {
      core.warning("We couldn't detect Lerna syntax tag")
      return
    }

    const { scope, packageName, version } = packageInfo

    core.debug(`Parsed Scope => ${scope}`)
    core.debug(`Parsed Package Name => ${packageName}`)
    core.debug(`Parsed Package Version => ${version}`)

    core.setOutput('package_name', packageName)
    core.setOutput('version', version)
    core.setOutput('scope', scope)

    core.exportVariable('LERNA_PACKAGE_NAME', packageName)
    core.exportVariable('LERNA_PACKAGE_VERSION', version)
    core.exportVariable('LERNA_PACKAGE_SCOPE', scope)
  } catch (error) {
    core.setFailed(error.message)
  }
}

runAction()
