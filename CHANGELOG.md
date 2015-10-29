### sif 0.8.4

* Updated README.md; added usage examples, installation instructions, and
development guidelines.
* Created a `tmp` folder. The folder is required for some of the `sif` commands
to function properly.
* Created a "code of conduct".

### sif 0.8.1

* Encoding fixes on the index file.
* Minor changes to  the `update` routine.
* Added a watcher to the `devbin` (`devbin/watch.js`) so that changed files 
are transpiled when changed.
* Added a `list-empty-titles.sh` to list unprocessed lines.

### sif 0.8.0

* Implemented `tag` functionality.
* Minor bugfixes.

### sif 0.7.0

* Implemented `purge` functionality.
* Updated npm scripts; `npm publish` now does a transpilation before publishing
things.

### sif 0.6.3

* Certain gzip-encoded requests were not being parsed correctly; the issue
has been fixed.
* Other minor bugfixes.
* Cleaned up `index.dat`.

### sif 0.6.2

* `sif` can now be installed as a global executable.

### sif 0.5.1

* Refactoring, code formatting, and bug fixes.

### sif 0.5.0

* Implemented "aliases" feature; now you can save common queries and `sif find`
them using their `@aliases`.
* created a publish script.

### sif 0.4.0

* Code cleanup
* Removed transpiled code from source control; created a release script instead.

### sif 0.3.0

* Implemented `sif update`. 

### sif 0.2.1

* `sif find` is working.
* Removed inline TODO items; put them into GitHub as issues.
