## Custom Keycloak themes

Add a directory for each custom theme; the directory name is the theme name. Select it per realm under Realm settings > Themes.

Branding set in a realm's `manager_config.json` needs no theme. To go further, extend the [OpenRemote theme](https://github.com/openremote/keycloak/blob/main/README.md#the-openremote-theme) with a child theme that adds its own stylesheets through `orStyles` (needs `openremote/keycloak` 26.7.5.0 or later):

```properties
# deployment/keycloak/themes/<theme>/login/theme.properties
parent=openremote
orStyles=css/custom.css
```

Paths in `orStyles` resolve against the theme's `resources` directory, and these stylesheets load after the OpenRemote theme's own. A child theme can also override a whole page's `.ftl`, but not the messages of the pages the OpenRemote theme renders. See [Custom stylesheets](https://github.com/openremote/keycloak/blob/main/README.md#custom-stylesheets) for what to style and how to preview a theme without a container.

The OpenRemote login theme is a compiled bundle, not templates to copy. Its email templates are plain FreeMarker in [`theme/src/main/resources/theme/openremote/email`](https://github.com/openremote/keycloak/tree/main/theme/src/main/resources/theme/openremote/email).

This themes directory can then be volume mapped into the Keycloak container at `/deployment/keycloak/themes`.

### Development

The `profile/dev-ui.yml` compose profile maps the `deployment` directory into Keycloak and turns off theme caching, so changes to a theme show on a browser refresh.
