# Use With i18n-ally

Since [i18n-ally](https://github.com/lokalise/i18n-ally) scans your `package.json` for supported frameworks and you don't use a framework, you can get it to work by using a [custom framework](https://github.com/lokalise/i18n-ally/wiki/Custom-Framework) definition file. Create a `.vscode/i18n-ally-custom-framework.yml` with the following:

<!-- WARNING! If you are reading this in the repo, usageMatchRegex values have been double-escaped to be correct in the web - look on the web for the correct values -->

```yaml title=".vscode/i18n-ally-custom-framework.yml"
# An array of strings which contain Language Ids defined by VS Code
# You can check available language ids here: https://code.visualstudio.com/docs/languages/identifiers
languageIds:
  - javascript
  - typescript
  - svelte

# An array of RegExes to find the key usage. **The key should be captured in the first match group**.
# You should unescape RegEx strings in order to fit in the YAML file
# To help with this, you can use https://www.freeformatter.com/json-escape.html
usageMatchRegex:
  - "[^\\\\\w\\\\d]t\\\\(['\\\"`]({key})['\\\"`]" # i18n-ally's default example of how to detect `t("your.i18n.keys")` - the `{key}` will be placed by a proper keypath matching regex, you can ignore it and use your own matching rules as well
  # - "[^\\\\w\\\\d]i18n\\\\.(.+?)[^\\\\w\\\\.]" # 👈 use this if you want to match the alternative direct method demoed in this repo, as in `$page.data.i18n.hello.world`

# If set to true, only enables this custom framework (will disable all built-in frameworks)
monopoly: true
```


That will give you a nice experience like this:

![i18n-ally](/i18n-ally.png)
