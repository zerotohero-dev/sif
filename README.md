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

## About

TODO:// this README is in draft mode.

`sif` is an intelligent curator that makes information meaningful and findable.

> `sif` is not a search engine; it's different.

The only way to see how different it is, is through actually using it.

I've been privately using a bunch of shell scripts for a similar purpose;
and now I decided to make it more usable.

// TODO: add instructions about how to build sif for those who want to contribute.

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
are slower to use than a terminal. --- command line FTW!

--

// TODO: processing a duplicate link should be visible in the report output so that
you can decide to update or ignore it.

// TODO: some of the stuff in "lib" (like the one that goes through links and gets meta information) 
// can turn out to be additional side projects keep this in mind when writing them.

// TODO: also write about the development process, how the js is transpiled etc.

REMARK:
sif runs in unix-like environments; why? because I wanted to leverage the already
superb file searching and sorting capabilities of unix. -- `egrep` and `sort`
can be implemented in pure JavaScript (as streams) too; I'll leave it in the 
"icebox" for issues to consider later.
