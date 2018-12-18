# sass-compile

Simple sass compiler, with module path importer and data uri inliners.

Usage: `sass-compile [options] <input.scss> <result.css>`

```
Options:
  --help                 Show help                                     [boolean]
  --version              Show version number                           [boolean]
  --include, -i          Path to look for imported files and assets      [array]
  --replace, -r          Replace from the start before path resolve
                         Syntax: -replace pre/path;new/path
  --output-style, -s     CSS output style
               [string] [choices: "nested", "expanded", "compact", "compressed"]
  --indent-type          Indent type for output CSS
                           [string] [choices: "space", "tab"] [default: "space"]
  --indent-width         Indent width; number of spaces or tabs (maximum: 10)
                                                           [number] [default: 2]
  --linefeed             Linefeed style
                  [string] [choices: "cr", "crlf", "lf", "lfcr"] [default: "lf"]
  --source-comments      Include debug info in output [boolean] [default: false]
  --source-map           Emit source map              [boolean] [default: false]
  --source-map-contents  Embed include contents in map[boolean] [default: false]
  --source-map-embed     Embed sourceMappingUrl as data URI
                                                      [boolean] [default: false]
  --source-map-root      Base path, will be emitted in source-map as is [string]
  --precision            The amount of precision allowed in decimal numbers
                                                           [number] [default: 6]
```

## Quick guide

Install sass-compile:

```
npm install --save-dev @wenris/sass-compile
```

Run it:

```
$ ./node_modules/.bin/sass-compile path/to/input.scss path/to/out.css
```

## Features

1. Import node modules files, with / without `~` prefix

2. Replace from the start before path resolve

3. Inline assets like images and fonts

For example, input.scss:

```
@font-face {
  font-family: "icons16";
  font-weight: normal;
  font-style: normal;
  src: inline('fonts/icons-16.woff');
}
```

output.css:

```
@font-face { font-family: "icons16"; font-weight: normal; font-style: normal; src: url("data:font/woff;base64,~~base64-encoded-uri~~"); }
```
