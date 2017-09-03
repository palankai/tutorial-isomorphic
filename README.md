# How to build a React + Redux Isomorphic website

## What is this tutorial

In this tutorial I'm going to explain step-by-step how can you build a complex
React application from scratch. I'm not going to use any boilerplate because
I want to show every steps which hopefully helps to understand what happens
behind.
There are many-many plugins which you could use, however I believe
if you follow my footsteps you will understand the React world and will
be able much more confidently use any 3rd party modules.

### Why

I'm a python backend developer, I don't usually build webpages nowadays,
however, sometimes I have to build some admin interfaces to our
backend services. I have some (very rusty) JavaScript knowledge so I
started to read tutorials. I found some very good tutorials but I haven't
find a complete tutorial which explains everything literally step-by-step.
So I've decided I document my experiments in this new world.

## Prerequisite

You should know how to use Docker (and Compose) and have minimal knowledge
of HTML, CSS and Javascript.
If you have any question, you find difficult to follow any of the steps or
you think I should give more explanation please drop me a message.

### Technical prerequisite

We will use Docker and Docker Compose. You should have the most recent
version installed. I did everything on MacOS (using Docker-Mac) but I
believe everything should work just fine on Linux or Windows.

## Tutorial

In this tutorial we're going build a simple CRUD application, an
(ADR)[http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions]
catalogue.
Let's assume we have the [HTML site build](html). We are going to make it a
rich React Universal web application.

In each folder of phases you will find the files which was created in the
previous step. Use that folder as a working directory.


### [Phase 1 - Build a traditional website](phase-1-traditional-website/)

In this tutorial we're going to build a traditional website using
[Express](https://expressjs.com) (4.x) as a web application framework.
We also use [EJS](http://www.embeddedjs.com) which is a very traditional
template engine. Most importantly we introduce
[Babel](http://babeljs.io) to transform our files.

If you're familiar with Babel and Express you can safely skip this phase.


### [Phase 2 - Introduce React](phase-2-introduce-react/)

This chapter will show the basic usage of react and we make our application
universal.

### [Phase 3 - Deeper understand of components](phase-3-use-react/)

Refactor components deeper


### [Phase 4 - Server Side Routing](phase-4-routing/)

We walk through the steps of server side routing. Refactor further
our application.


## Disclaimer

I'm not a NodeJS or React expert. I built many websites with JavaScript
but it was back in the stone age, when I used HTML (not HTML5) and JQuery.
That's very likely you will find better, easier or quicker solutions for
the demonstrated problem.

## References

I've learned and used some of the materials from this amazing tutorial:
http://ccoenraets.github.io/es6-tutorial-react/ I recommend to read those
pages as well. You can find more material about babel, webpack and ES6 as well.
