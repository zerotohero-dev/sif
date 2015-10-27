```
   _,                            ,--.   ,---.
  /(_                     ,---.  `--'  /  .-'
 |   '-._        . ' .   (  .-'  ,--.  |  `-,
 \    ,-.)      -= * =- .-'  `)  |  |  |  .-'
  \((` .(        '/. '  `----'   `--'  `--'
   )\  _/        /         just like magic
.-'   '--.      /
\,         \   /|
 ';,_) _)'\ \,//    
  `\   (   '._/   
   |  . '.
   |      \
   |  \|   |
    \  |  /
     '.| /
```

> **NOTE**
> 
> This README is in draft mode.
>
> I'll remove this notice when the README is finalized.

## Summary

`sif` is an intelligent curator that makes information meaningful and findable.

It's basically a command line interface that you can search for things real 
fast. You can, for example call `sif find tutorial` and `sif` will display you
a bunch of tutorial links (*the `find` command takes a regular expression as the
search argument, which means you can do things like 
`sif find "youtube*tutorial"` which will show you a refined set of links*).

Although `sif`s main focus is on sifting and finding links, you can use it
to store and search arbitrary lines of text too.

Read [this section] to learn more about what `sif` is capable of.

## The Backstory

I touch a substantial amount of links while I'm doing my day-to-day work. 
I collect, categorize, and sift links.

After figuring out that it becomes damn hard to search your bookmarks after your 
browser's bookmark index grows above tens of megabytes, I decided to create a
command-line utility that will help me sift through data efficiently 
and effectively.

Although there are websites for this purpose, they are slow to respond, and the
are slower to use than a terminal. — command line FTW!

## Who Should Use `sif`?

If you love links, if your browser has hundreds (*if not thousands*) bookmarks
waiting to be sifted through, if you have used services like [read it later],
[xmarks], or [delicious] for a hope to organize your links, if you love to keep 
your information all together, and if you love to find things easily, and if 
you like the speed, beauty, and simplicity of the command line, then `sif` 
has been tailored just for you.

> **Note**
>
> Since `sif` is a command line interface to sifting your stuff, you'll benefit
> it most, you are comfortable with the command line. However, even if you 
> are not a command line aficionado it's really easy to get used to it if you
> [spend five minutes to read the **Usage Examples**][link].

## Dependencies

`sif` is a [Node.JS] command line application, therefore it requires a [Node.JS]
runtime. To install `sif`, you will also need [npm], which comes bundled with
[Node.JS] most of the time.

And since `sif` uses builtin `bash` commands for execution speed, you will need
a unix flavor, or Mac OS X.

For windows users, an emulation layer like Cygwin might also work; however
`sif` has not been tested on Windows yet.

sif runs in unix-like environments; why? because it leverages the already
superb file searching and sorting capabilities of unix: Mainly `egrep` and `sort`
 
`egrep` and `sort` can be implemented in pure JavaScript (as streams) too; 
this, and it's currently a [feature to be implemented in the future][ref].

Until then the only way to run `sif` on windows is to use some form of emulation
layer.

## How to Install

Once you have `node` and `npm` installed, execute the following command to
install `sif`:

```bash
npm install sif -g
```

To check that `sif` is up and running, simply call `sif` on the terminal which
will display an introductory help message.

You can get further help by executing `sif [cmd]` where `cmd` is the command
name that you want to get help. 

For example, to get further help about the `find` command, simply type the
following in the terminal:

```bash
sif help find
```

## How to Upgrade

To update `sif` to the latest version run a

```bash
npm update sif -g
```

> **CAVEAT**
> 
> Currently updating `sif` will delete your current data.
> So make sure that you backup your global `node_modules/sif/data` folder
> before doing an update.
>
> Updating will be easier in the upcoming versions of `sif`; however, it's
> not without side effects right now.

## Local Development Setup

To develop `sif` locally first fork the project, first [fork it][fork] and then
[clone][clone] it to your computer.

> **Note**
>
> We will use `~/PROJECTS/sif` as the project workspace, yours could be
> different.

After that, `cd` to the project root do an `npm install`:

```bash
cd ~/PROJECTS/sif
npm install
```

This will install `sif` locally.

From the project root, call:

```bash
cd ~/PROJECTS/sif
./devbin/prepublish.sh
```

Then call:

```bash
cd ~/PROJECTS/sif
source ./devbin/alias.sh
```

`alias.sh` will create an alias for `sif` that uses your local files.

> **Note**
>
> You can also use `npm link`, instead of using `./devbin/alias.sh`.
>
> Though `npm link` will permanently replace your global `sif` command whereas
> `./devbin/alias.sh` will only replace it for the current development session.

You will need the `.es6` files to be regularly transpiled to `.js` to be able
to run the code. To make that easier there is a watcher app.

If you run… 

```bash
cd ~/PROJECTS/sif
node ./devbin/watch.js
```

then whenever you change an `.es6` module, it will be automatically transpiled
to **JS**.

You can read more about **ES6** and transpilation at 
[Babel's ES6 documentation][babel].

## `sif` Internals

`sif` uses Linux file processing commands, [child processes][child_process] and
[streams][streams] to get its job done.

Here's a brief outline of its directory layout:

### The Index

`sif` has a large sample data that you can use out-of-the box if you want to.

This data set is regularly updated, and you can get the most recent version by
simply running an `npm update sif -g` command.

Additionally, you are more than welcome to PR and add links to it.

TODO:// explain process of how to suggest link.
TODO:// add ability to fetch recent data set (from github)

### Directory Structure

* **bin**: Contains commands that the global `sif` application uses. The `sif`
 global is just an alias to `bin/sif.js`. — `bin/sif.es6` is the entry point
 of the application.
* **data**: The index file, and the runbooks are stored here.
* **data/runbooks**: This is currently a proof oc concept. It included bite-sized
instructions to manage certain technical tasks, so that you don't have to google
it over and over again.
* **devbin**: Utility scripts that are used for developing, bundling, and 
publishing `sif`.
* **lib**: Helper modules that the files in **bin** use.
* **CHANGELOG.md**

## Configuration

Currently there are no configuration options for `sif`; this will change
in the upcoming releases

## Supported Environments

`sif` runs best in unix-like environments (*i.e., Mac OS, and Linux*).

Although technically `sif` can run in Windows using an emulation layer like
[cygwin][cygwin] it has not been tested in Windows yet.

## Usage Examples

### Searching

```bash
sif find "jquery"

# You can use regular expressions too
sif find "jQuery.*css"
sif find "jQ\S*ry|atom|b..lerpl.te"

# Since this is a unix shell, you dan do further filterin on the results:
sif find "jQ\S*ry|atom|b..lerpl.te" | grep boiler
```

### Aliases

TODO:// this command has not been implemented yet.

### Alias

TODO:// this command is under development.

### Removing an Alias

TODO:// this command is under development.

### Tagging

TODO:// this command is under development.

Tags can be any kind of text; try to keep your tags simple and memorable.
An alias is a single-word token with no spaces in it.

### Updating the `sif` Index

TODO:// this command is under development.

### Deleting Everything

`sif` gets bundled with a lot of useful information and links; however if
you want to start with a blank slate, you can do so.

The easiest way to do that is to run the following in the command prompt:

```bash
sif purge
```

Be warned that, this command will delete all the data including the search
index, the runbooks, the aliases, and anything else.

## Versioning and Backwards Compatibility

`sif` follows [semantic versioning][semver] rules and it is versioned in the
`major.minor.patch` format. — Any breaking backwards-incompatible change will
increment the **major** version number; any backwards-compatible enhancement will
increment the **minor** version number; and any bugfixes that don't add extra 
features will increment the **patch** version number.

## Wanna Help? 

Contributors are more than welcome. — 

You can help make `sif` even better by…

* [Suggesting new features by opening issues]
* [Cleaning up open issues]
* [Finding bugs in the code and creating issues for that]
* Testing `sif` in your platform.
* Actually using `sif` and providing feedback (as issues).
* Forking the code, and creating pull requests.

> In lieu of a formal styleguide, take care to maintain the existing 
coding style. Other than that, there's no formal contribution requirements.

## Contact Information

* **Project Owner**: [Volkan Özçelik](http://volkan.io/)
* **Project Website**: [o2js.com](http://o2js.com/)

## License

MIT-Licensed. — See [LICENSE.md] for details.

## Code of Conduct

Bottom line up front:

We are committed to making participation in this project a harassment-free 
experience for everyone, regardless of level of experience, gender, gender 
identity and expression, sexual orientation, disability, personal appearance, 
body size, race, ethnicity, age, religion, or nationality.

[See the code of conduct for details][code-of-conduct].
