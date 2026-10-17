# Abhyasa redesign

Static HTML, CSS, JavaScript, and image assets for the Abhyasa VLSI website redesign.

## Preview locally

Serve this directory with a static web server and open the root URL. For example:

```sh
npx serve .
```

## Deploy

Publish the repository root as a static website. `index.html` is the homepage. The other pages are in the root, `courses/`, `projects/`, and `blog/`. Keep the `images/` directory with the pages so image paths resolve.

The contact and enrollment forms open the visitor's email client; they do not submit to a server endpoint.
