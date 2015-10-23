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

Currently it cannot run on Windows because it uses builtin Linux commands.

## Usage Examples

TBD

## Versioning and Backwards Compatibility

TBD

## Wanna Help?

TBD

## Contact Information

* **Project Owner**: [Volkan Özçelik](http://volkan.io/)
* **Project Website**: [o2js.com](http://o2js.com/)

## License

## Code of Conduct

As contributors and maintainers of this project, and in the interest of 
fostering an open and welcoming community, we pledge to respect all people who 
contribute through reporting issues, posting feature requests, updating 
documentation, submitting pull requests or patches, and other activities.

We are committed to making participation in this project a harassment-free 
experience for everyone, regardless of level of experience, gender, gender 
identity and expression, sexual orientation, disability, personal appearance, 
body size, race, ethnicity, age, religion, or nationality.

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery
* Personal attacks
* Trolling or insulting/derogatory comments
* Public or private harassment
* Publishing other's private information, such as physical or electronic 
addresses, without explicit permission
* Other unethical or unprofessional conduct.

Project maintainers have the right and responsibility to remove, edit, or 
reject comments, commits, code, wiki edits, issues, and other contributions 
that are not aligned to this Code of Conduct. By adopting this Code of Conduct, 
project maintainers commit themselves to fairly and consistently applying these 
principles to every aspect of managing this project. Project maintainers who 
do not follow or enforce the Code of Conduct may be permanently removed from 
the project team.

This code of conduct applies both within project spaces and in public spaces 
when an individual is representing the project or its community.

Instances of abusive, harassing, or otherwise unacceptable behavior may be 
reported by opening an issue or contacting one or more of the project 
maintainers.

*This Code of Conduct is adapted from the 
[Contributor Covenant](http://contributor-covenant.org), version 1.2.0, 
available at 
[http://contributor-covenant.org/version/1/2/0/](http://contributor-covenant.org/version/1/2/0/)*.


// TODO: below is to be move/removed.



## Has Only What's Needed

Parkinson's Law tells us that "work expands so as to fill the time available for 
its completion". Applied to software, this means that applications tend to 
bloatware, obese programs whose complexity makes them nearly impossible to
 debug and maintain.
 
## Usage Examples

TODO:// to be updated.

## The Index

`sif` has a large sample data that you can use out-of-the box if you want to.
I regularly update the data set; and you are welcome to suggest additional links
too.

The initial data you see when you install `sif`, will be my original 
(and growing) working set; however you are more than welcome to PR and add 
additional links to it.

TODO:// explain process of how to suggest link.
TODO:// add ability to fetch recent data set (from github)

## The Backstory

I touch a substantial amount of links while I'm doing my day-to-day work. 
I collect, categorize, and sift links.

After figuring out that it becomes damn hard to search your bookmarks after your 
browser's bookmark index grows above tens of megabytes, I decided to create a
command-line utility that will help me sift through data efficiently 
and effectively.

Although there are websites for this purpose, they are slow to respond, and the
are slower to use than a terminal. — command line FTW!

--

// TODO: processing a duplicate link should be visible in the report output so that
you can decide to update or ignore it.

// TODO: some of the stuff in "lib" (like the one that goes through links and gets meta information) 
// can turn out to be additional side projects keep this in mind when writing them.

// TODO: also write about the development process, how the js is transpiled etc.

REMARK:
sif runs in unix-like environments; why? because I wanted to leverage the already
superb file searching and sorting capabilities of unix. — `egrep` and `sort`
can be implemented in pure JavaScript (as streams) too; I'll leave it in the 
"icebox" for issues to consider later.

Tags can be any kind of text; try to keep your tags simple and memorable.
An alias is a single-word token with no spaces in it.
