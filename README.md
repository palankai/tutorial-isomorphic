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

## Tutorial part A

### 01 Getting started

In our first tutorial we build a very simple React component which
will be bundled with webpack.
[Getting started](A01-getting-started)

### 02 Getting tested

We started building our application, however we need to make sure
when we modify our code we won't change unintentionally the behaviour so
[Getting tested](A02-getting-tested)

### 03 Getting routed

If you build a website using React that's very likely you need to handle
different pages (different URLs). In this chapter I'm going to demonstrate
how can we handle the URL changes.
[Getting routed](A03-getting-routed)

### 04 Getting rendered

If you build a website using React that's very likely you need to handle
different pages (different URLs). In this chapter I'm going to demonstrate
how can we handle the URL changes.
[Getting rendered](A04-getting-rendered)

### 05 Getting data

Receive and send some data to the server...
TODO

### 06 Getting styled

Using CSS (SCSS) we are going to make our application pretty...
TODO

### 07 Getting well organised

We are going to refactor our application code, using small tricks
that make the development easier.
TODO

## Disclaimer

I'm not a NodeJS or React expert. I built many websites with JavaScript
but it was back in the stone age, when I used HTML (not HTML5) and JQuery.
That's very likely you will find better, easier or quicker solutions for
the demonstrated problem.

## References

I've learned and used some of the materials from this amazing tutorial:
http://ccoenraets.github.io/es6-tutorial-react/ I recommend to read those
pages as well. You can find more material about babel, webpack and ES6 as well.
