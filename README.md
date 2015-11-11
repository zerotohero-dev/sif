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
**findable**; it's a command line interface that runs **as fast as you think**.
— Oh, she's also known as a Norse goddess.

You can, for example, call [`sif find tutorial`](#searching) and `sif`
will display you a list of tutorial links.

`sif`'s main focus is on sifting through and finding links. You can think of it as a
command-line bookmark manager.

[Read the usage examples section](#usage-examples) to learn more about what
`sif` is capable of.

## Dependencies

`sif` is a [Node.JS][nodejs] command line application. So it requires a
[Node.JS][nodejs] runtime.

To install `sif`, you will also need [npm][npm], which comes bundled with
[Node.JS][nodejs] most of the time.

`sif` runs best in unix-like environments: It leverages the already
superb file searching and sorting capabilities of unix, mainly [`egrep`][egrep]
and [`sort`][sort].

> **Note**
>
> `egrep` and `sort` can be implemented in pure JavaScript (as streams) too;
> [implementing these in the future][issue-16], will make `sif` more portable
> and more platform-agnostic. Until then if you don't have [bash][bash],
> then you'll need an emulation layer to run `sif`.

## Supported Operating Systems

### Unix-Like Operating Systems

`sif` works well in `unix`, and `Mac OS X`.

### Windows

For `windows` the installer will reject to install. And even if you force it by
`npm install sif -g --force` you will get error when you're running the program.

There are [open issues][issues] about that, so it'll be fixed in the future.
If you feel like you can fix it faster, fix it and make a pull request; we'll
love to have your help.

## How to Install

Once you have [`node`][nodejs] and [`npm`][npm] installed, execute the following command to install `sif`:

```bash
sudo npm install sif -g
```

To check that `sif` is up and running, simply call `sif` on the terminal.
This action will display an introductory help message.

```bash
sif

     _,
    /(_
   |   '-._        . ' .
   \    ,-.)      -= * =-
    \((` .(        '/. '
     )\  _/        /
  .-'   '--.      /
  \,         \   /|
   ';,_) _)'\ \,//


  Usage: sif [options] [command]

  … truncated …
```

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

> **Caveat**
>
> Updating `sif` will delete your data.
> So make sure that you backup your global `node_modules/sif/data` folder
> before doing an update.
>
> [Upgrading will be easier in the upcoming versions][issue-68]; but, it's
> not without side effects right now.

## Configuration

Currently, there are no configuration options for `sif`; [this will change
in the upcoming releases][issue-69].

## Usage Examples

### Searching

```bash
sif find "jquery"

# You can use regular expressions too
sif find "jQuery.*css"
sif find "jQ\S*ry|atom|b..lerpl.te"

# Since this is a unix shell, you can do further filtering on the results:
sif find "jQ\S*ry|atom|b..lerpl.te" | grep boiler
```

### Aliases

TODO:// this command has not been implemented yet.

### Alias

> **Note**
>
> This command requires `sudo` access.

An alias is a single-word token with no spaces in it. Instead of typing
a complicated search RegExp over and over again you can just type the search
alias preceeded by an "@" sign.

For example, the following statement defines a search alias:

```bash
sudo sif alias videos "youtube\.com|vimeo\.com"
```

And the following statement executes a search with the defined alias:

```bash
sif find @videos
```

If you define an existing alias you overrite it.

```bash
# Define a search alias:
sif alias test "test"

# Update the alias:
sif alias test "test|sample"
```
### Removing an Alias

To remove an alias use `rmalis`:

```bash
sif rmalias youtube
```

TODO:// this command is under development.

### Tagging

> **Note**
>
> This command requires `sudo` access.

You can also add tags to a set of links that match a search query.

Tags can be any kind of text; try to keep your tags simple and memorable.

```bash
# Tag all links that match the "cisco.com" with 'cisco'.
sudo sif tag "cisco.com" cisco
```

### Removing a tag

> **Note**
>
> This command requires `sudo` access.

Removing a tag is equally easy:

```bash
sudo sif rmtag "cisco.com" cisco
```

### Updating the `sif` Index

> **Note**
>
> This command requires `sudo` access.

Calling `sudo sif update` will update the index file, amending necessary meta data
if required.

### Deleting Everything

> **Note**
>
> This command requires `sudo` access.

`sif` gets bundled with a lot of useful information and links; yet if
you want to start with a blank slate, you can do so.

The easiest way to do that is to run the following in the command prompt:

```bash
sudo sif purge
```

Be warned that this command will delete all the data including the search
index, the runbooks, the aliases, and anything else.

### Getting Help

Simply typing `sif`, `sif help`, `sif --help` or `sif h` will display a help
message.

You can display further help information by typing `sif help [cmd]`.
For example, to get help about the `sif find` command, just type
`sif help find`.

## Hey, I'm Stuck!

For any issues that you stumble upon, [feel free to open a ticket][new-issue].

TODO:// Code documentation is not ready yet.

## Supported Environments

`sif` uses builtin [bash][bash] commands. So, to
use it, you will either need a unix flavor such as [Ubuntu][ubuntu]
or [Fedora][fedora]; or a fake linux like [Mac OS][mac]; or a linux emulation
layer like [Cygwin (*for Windows*)][cygwin].

Therefore, `sif` runs best in unix-like environments (*i.e., Mac OS, and
Linux*).

> *Note*
>
> `sif` is not tested thoroughly on Windows, so your experience there
> may vary. — If you are a Windows user,
> [please report any issues you have][new-issue] so that it can be scheduled to
> be fixed in the upcoming releases.

## Versioning and Backwards Compatibility

`sif` follows [semantic versioning][semver] rules, and it is versioned in the
"**major**.**minor**.**patch**" format.

* Any breaking backwards-incompatible change will
increment the **major** version number.
* Any backwards-compatible enhancement will increment the **minor** version
number.
* And any bug fixes that don't add extra features will increment the **patch**
version number.

----

## The Backstory

I am addicted to links, and I touch a substantial amount of links while
I'm doing my day-to-day work.

I **collect**, **categorize**, sift through, and **organize** links.

And guess what? After you browser's bookmark index grows above a few tens of
megabytes, using your browser becomes a burden. Your fellow browser becomes
a "not-responding-and-unbearably-slow-big-fat-memory-hog".

And, believe me, that's **not fun**.

There are "*social bookmarking as a service*" websites to remedy, of course.

They, however, have their drawbacks:

These web applications require you
to be online. Even if you are lucky to find an offline-enabled one, you'll
still need to hit their APIs to do any meaningful work
(*like performing a search, for instance*).

The need to be connected; and the need to use some form of graphical interface
(*be it the browser, or an app*)  introduce **friction** in the way you
get things done.

> If being interrupted by your pointy-haired boss is the worst thing that kills
> productivity, **friction** is the next worst thing on the line.

Last, but not the least, under poor network conditions there will be lots of
**latency** when you are performing a search.

> The next worst annoying thing to having your pinky toe stub in the doorway
> is watching a spinner a whole minute only to see a "*Connection Failed*"
> error on a slightly-grayish blank page.

`sif` doesn't have any of those problems:

* It has **near-zero** search latency because everything is stored locally.
* You don't need to push buttons to use it; you only need to **type**.
* It is **fast**, **responsive**, and **free of distractions**.

> **Note**
>
> Along with sifting through links, in the future it will also be possible to
> search within arbitrary text data
> (*[such as runbooks](#the-directory-structure)*); however, the current focus
> of `sif` being the best program to index bookmarks locally.

## Who Should Use `sif`?

If you love **links**; if you have hundreds (*if not thousands*) bookmarks
waiting to be organized; if you have used services like [pocket][pocket],
[xmarks][xmarks], or [delicious][delicious] for a hope they will be good enough
to sift through your links; if you love to keep your information all together,
if you want to **find things without hassle**; and if you like the
**speed**, **beauty**, and **simplicity** of the **command line**… then
`sif` is just for you.

----

## Wanna Help?

Contributors are more than welcome.

You can help make `sif` even better by:

* [Suggesting new features by opening issues][new-issue].
* [Cleaning up open issues][issues].
* [Finding bugs in the code and creating issues for that][new-issue].
* Testing `sif` by using it, and [providing feedback][new-issue].
* [Forking the code, making it better, and creating pull requests][git-pr].

> **Note**
>
> If you are planning to contribute to the source code, we won't bore you with
> a giant list of coding conventions **:)**. It's your contribution that
> that matters.
>
> Instead of a formal style guide, take care to maintain the existing
> coding style. Other than that, there's no formal contribution requirements.

If you want to dive into the code, then the following sections may be useful.

## Local Development Setup

> **Note**
>
> In this section, we will use `~/PROJECTS/sif` as the project workspace,
> yours could be different.

To develop `sif` locally, first [fork it][git-fork] and then [clone][git-clone]
it to your development environment.

Then `cd` to the project folder:

```bash
cs ~/PROJECTS/sif
```

After that, `cd` to the project root do an `npm install`:

```bash
npm install
```

This will install a local development environment for `sif`.

Then, from the project root, execute the following command:

```bash
./devbin/prepublish.sh
```

Then execute:

```bash
source ./devbin/alias.sh
```

`alias.sh` will create an alias for `sif` that points to the `sif` executable
in your project root (*i.e., `~/PROJECTS/bin/sif.js` in our case*).

> **Note**
>
> You can also use `npm link`, instead of using `./devbin/alias.sh`.
>
> However, [`npm link`][npm-link] will permanently replace your global
> `sif` command whereas `./devbin/alias.sh` will only replace it for the
> development session.

You will need the `.es6` files to be regularly transpiled to `.js` to be able
to run, debug, and develop the code.

To make that easier, there is a watcher binary. If you run…

```bash
node ./devbin/watch.js
```

…then whenever you change an `.es6` module, it will be automatically transpiled
to `.js`.

> **Note**
>
> You can read more about **ES6** and transpilation at
> [Babel's documentation][babel].

## `sif` Internals

`sif` uses Linux [bash][bash] file processing commands,
[child processes][child-process] and [streams][node-streams] to get the job
done. It's a command line shell that manages a large text file.

This large text file is **the index**. The following section has some additional
details about that.

### The Index (*data/index.idx*)

The index is a plain text file that can be modified with your favorite text
editor.

When you run a `sif update` this file is traversed and processed as follows:

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
* **data/runbooks**: This is a proof of concept. It includes bite-sized
instructions to manage certain technical tasks, so that you don't have to google
it over and over again.
* **devbin**: Utility scripts that are used for developing, bundling, and
publishing `sif`.
* **lib**: Helper modules that the files in **bin** use.
* **CHANGELOG.md**: A change log of what has been added recently.
* **CODE_OF_CONDUCT.md**: Reminds you to be nice to others.
* **README.md**: This readme you are looking at.
* **LICENSE.md**: Boring copyright stuff.

## Contact Information

* **Project Owner**: [Volkan Özçelik](mailto:me@volkan.io)
* **Project Website**: <https://github.com/v0lkan/sif>

## License

MIT-Licensed. — See [the license file](LICENSE.md) for details.

## Code of Conduct

We are committed to making participation in this project a harassment-free
experience for everyone, regardless of the level of experience, gender, gender
identity and expression, sexual orientation, disability, personal appearance,
body size, race, ethnicity, age, religion, or nationality.

[See the code of conduct for details](CODE_OF_CONDUCT.md).

[git-clone]: https://git-scm.com/docs/git-clone
[git-fork]: https://help.github.com/articles/fork-a-repo/
[git-pr]: https://help.github.com/articles/using-pull-requests/

[nodejs]: https://nodejs.org
[npm]: https://www.npmjs.com
[babel]: http://babeljs.io

[pocket]: https://getpocket.com
[xmarks]: http://www.xmarks.com
[delicious]: https://delicious.com

[ubuntu]: http://www.ubuntu.com
[fedora]: https://getfedora.org
[cygwin]: https://www.cygwin.com
[mac]: http://www.wikiwand.com/en/Mac_OS

[bash]: https://www.gnu.org/software/bash/
[egrep]: http://ss64.com/bash/egrep.html
[sort]: http://ss64.com/bash/sort.html
[child-process]: https://nodejs.org/api/child_process.html
[node-streams]: https://nodejs.org/api/stream.html
[npm-link]: https://docs.npmjs.com/cli/link

[semver]: http://semver.org

[issues]: http://github.com/v0lkan/sif/issues/
[new-issue]: http://github.com/v0lkan/sif/issues/new
[issue-16]: https://github.com/v0lkan/sif/issues/16
[issue-68]: https://github.com/v0lkan/sif/issues/68
[issue-69]: https://github.com/v0lkan/sif/issues/69
