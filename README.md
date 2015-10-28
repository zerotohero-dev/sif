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

## Summary

`sif` is an intelligent **curator** that makes information **meaningful** and 
**findable**.

`sif` is a command line interface that runs **as fast as you think**.

You can, for example call `sif find tutorial` and `sif` will display you
a list of tutorial links (*[the `find` command][#searching] accepts 
regular expression too, which means you can do things like 
`sif find "youtube*tutorial"` to search for things that have "youtube" or
"tutorial" in them*).

Although `sif`'s main focus is on sifting and finding links, you can use it
to store and search arbitrary lines of text too.

[Read the usage examples section][#usage-examples] to learn more about what 
`sif` is capable of.

## The Backstory

I am addicted to links.

I touch a substantial amount of links while I'm doing my day-to-day work. 

I collect, categorize, and sift links.

I've also figured out that after you browser's book mark index grows above 
a few tens of megabytes, it becomes really hard to use it: Browsing websites
and searching inside your bookmarks become unbearably slow.

Although there are "social bookmarking as a service" websites for this purpose, 
they are slow to respond, and they require you to be online, and you need 
a browser to begin with.

`sif` has zero latency because everything is stored locally.

Grepping a plain text file in the command line is much more faster, and much 
less disruptive than searching for things by launching the browser, going to 
a website, performing a search, and waiting for the response to come over the
wire. 

Command line FTW!

## Who Should Use `sif`?

If you love **links**, if you have hundreds (*if not thousands*) bookmarks
waiting to be sifted through, if you have used services like [pocket][pocket],
[xmarks][xmarks], or [delicious][delicious] for a hope they will be good enough
to **sift your links**, if you love to keep your information all together, 
if you want to **find things without hassle**, and if you like the 
**speed**, **beauty**, and **simplicity** of the **command line**, then 
`sif` is just for you.

> **Note**
>
> Since `sif` is a command line interface, you'll benefit it most if you are 
> comfortable with the command line. 
> 
> Even if you are not a command line aficionado, however, it's really easy to 
> get used to it if you [spend five minutes to go through 
> the **Usage Examples**][#usage-examples].

[pocket]: https://getpocket.com
[xmarks]: http://www.xmarks.com
[delicious]: https://delicious.com

## Dependencies

`sif` is a [Node.JS][nodejs] command line application, therefore it requires a [Node.JS]
runtime. 

> **Note**
>
> To install `sif`, you will also need [npm][npm], which comes bundled with
[Node.JS][node] most of the time.

`sif` runs best in unix-like environments because it leverages the already
superb file searching and sorting capabilities of unix: Mainly [`egrep`][egrep] 
and [`sort`][sort].

> **Note**
> 
> `egrep` and `sort` can be implemented in pure JavaScript (as streams) too;
> [implementing these in the future][issue-16], will make `sif` more portable 
> and more platform-agnostic. Until then if you don't have [bash][bash], 
> then you'll need an emulation layer to run `sif`.

To rephrase, since `sif` uses builtin [bash][bash] commands. So, in order to 
use it, you will either need a unix flavor such as [Ubuntu][ubuntu] 
or [Fedora][fedora]; or a fake linux like [Mac OS][mac]; or a linux emulation 
layer like [Cygwin (*for Windows*)][cygwin].

> *Note*
>
> `sif` is not tested very thoroughly on Windows, so your experience there
> may vary. — If you are a windows user,
> [please report any issues you have][new-issue] so that it can be scheduled to
> be fixed in the upcoming releases.



## How to Install

Once you have [`node`][nodejs] and [`npm`][npm] installed, execute the following 
command to install `sif`:

```bash
npm install sif -g
```

To check that `sif` is up and running, simply call `sif` on the terminal which
will display an introductory help message.

You can get further help by executing `sif help [cmd]` where `cmd` is the 
command name that you want to get help. 

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

To develop `sif` locally first fork the project, first [fork it][git-fork] 
and then [clone][git-clone] it to your computer.

> **Note**
>
> We will use `~/PROJECTS/sif` as the project workspace, yours could be
> different.

After that, `cd` to the project root do an `npm install`:

```bash
cd ~/PROJECTS/sif
npm install
```

This will install a local development environment for `sif`.

Then, from the project root, call:

```bash
cd ~/PROJECTS/sif
./devbin/prepublish.sh
```

Then call:

```bash
cd ~/PROJECTS/sif
source ./devbin/alias.sh
```

`alias.sh` will create an alias for `sif` that points to the `sif` executable
in your project root (*i.e., `~/PROJECTS/bin/sif.js` in our case*).

> **Note**
>
> You can also use `npm link`, instead of using `./devbin/alias.sh`.
>
> However, `npm link` will permanently replace your global `sif` command whereas
> `./devbin/alias.sh` will only replace it for the current development session.

You will need the `.es6` files to be regularly transpiled to `.js` to be able
to run, debug, and develop the code. To make that easier there is a watcher
binary.

If you run… 

```bash
cd ~/PROJECTS/sif
node ./devbin/watch.js
```

then whenever you change an `.es6` module, it will be automatically transpiled
to `.js`.

You can read more about **ES6** and transpilation at 
[Babel's documentation][babel].

[babel]: http://babeljs.io

## `sif` Internals

`sif` uses Linux file processing commands, [child processes][child-process] and
[streams][node-streams] to get its job done.

`sif` is basically a a command line shell that manages a large text file which
is **the index**. The following section has some additional details about that.

### The Index (*data/index.idx*)

The index is a plain text file that can be modified with your favorite text
editor. 

When you run a `sif update` this file is traversed and processed:

* The lines get sorted in alphabethical order
* Some additional meta data (*such as description and titles*) is fetched from
the web and amended to the lines.

This index file is regularly updated, and you can get the most recent version by
simply running an `npm update sif -g` command.

Additionally, you are more than welcome to add links to it and [create
a pull request][git-pr] to get them merged back. 

To do that simply…

* [Fork this repository][git-fork].
* [Clone your forked repo][git-clone].
* Add the links you want to be merged to the end of `data/index.idx`.
* Finally, [create a pull request][git-pr].

### The Directory Structure

* **bin**: Contains commands that the global `sif` application uses. The `sif`
 global is an alias to `bin/sif.js`. — `bin/sif.es6` is the entry point
 of the application.
* **data**: The index file, and the runbooks are stored here.
* **data/runbooks**: This is currently a proof oc concept. It included bite-sized
instructions to manage certain technical tasks, so that you don't have to google
it over and over again.
* **devbin**: Utility scripts that are used for developing, bundling, and 
publishing `sif`.
* **lib**: Helper modules that the files in **bin** use.
* **CHANGELOG.md**: A change log of what has been added recently.
* **CODE_OF_CONDUCT.md**: Reminds you to be nice to others.
* **README.md**: This readme you are looking at.
* **LICENSE.md**: Boring copyright stuff

## Configuration

Currently there are no configuration options for `sif`; [this will change
in the upcoming releases][issue-69].

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
"**major**.**minor**.**patch**" format.

* Any breaking backwards-incompatible change will
increment the **major** version number. 
* Any backwards-compatible enhancement will increment the **minor** version 
number. 
* And any bugfixes that don't add extra features will increment the **patch** 
version number.

## Wanna Help? 

Contributors are more than welcome. — 

You can help make `sif` even better by:

* [Suggesting new features by opening issues][new-issue].
* [Cleaning up open issues][issues].
* [Finding bugs in the code and creating issues for that][new-issue].
* Testing `sif` by actually using it, and [providing feedback][new-issue].
* [Forking the code, making it better, and creating pull requests][git-pr].

> **Note**
>
> If you are planning to contribute to the source code we won't bore you with
> a giant list of coding conventions **:)**. It's your contribution that
> that matters.
> 
> In lieu of a formal styleguide, take care to maintain the existing 
> coding style. Other than that, there's no formal contribution requirements.

## Contact Information

* **Project Owner**: [Volkan Özçelik](http://volkan.io/)
* **Project Website**: [o2js.com](http://o2js.com/)

## License

MIT-Licensed. — See [the license file][LICENSE.md] for details.

## Code of Conduct

We are committed to making participation in this project a harassment-free 
experience for everyone, regardless of level of experience, gender, gender 
identity and expression, sexual orientation, disability, personal appearance, 
body size, race, ethnicity, age, religion, or nationality.

[See the code of conduct for details][CODE_OF_CONDUCT.md].

[git-clone]: https://git-scm.com/docs/git-clone
[git-fork]: https://help.github.com/articles/fork-a-repo/
[git-pr]: https://help.github.com/articles/using-pull-requests/

[nodejs]: https://nodejs.org
[npm]: https://www.npmjs.com

[ubuntu]: http://www.ubuntu.com
[fedora]: https://getfedora.org
[cygwin]: https://www.cygwin.com
[mac]: http://www.wikiwand.com/en/Mac_OS

[bash]: https://www.gnu.org/software/bash/
[egrep]: http://ss64.com/bash/egrep.html
[sort]: http://ss64.com/bash/sort.html
[child-process]: https://nodejs.org/api/child_process.html
[node-streams]: https://nodejs.org/api/stream.html

[semver]: http://semver.org

[issues]: http://github.com/v0lkan/sif/issues/
[new-issue]: http://github.com/v0lkan/sif/issues/new
[issue-16]: https://github.com/v0lkan/sif/issues/16
[issue-69]: https://github.com/v0lkan/sif/issues/69
