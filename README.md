# Abhyasa redesign

Static HTML, CSS, JavaScript, and image assets for the Abhyasa VLSI website redesign.

**Open the website:** [Abhyasa redesign](https://kottusaikumar.github.io/Abhyasa_redesign/)

## Preview locally

Run the dependency-free local preview server and open the URL it prints:

```sh
node scripts/preview-local.cjs
```

To choose a port, pass it as an argument, for example `node scripts/preview-local.cjs 4188`.

## Deploy

Publish the repository root as a static website. `index.html` is the homepage. The other pages are in the root, `courses/`, `projects/`, and `blog/`. Keep the `images/` directory with the pages so image paths resolve.

The contact and enrollment forms open the visitor's email client; they do not submit to a server endpoint.

The `Publish website` GitHub Actions workflow prepares the site for the repository's GitHub Pages path and publishes it after each push to `main`.
