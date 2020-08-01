### json

# Usage
Using an herokuish environment (Heroku/Dokku), just push to your remote.

Locally, run:

`yarn start` or `npm run start`

⚠ Make sure you installed packages (`yarn install`)

# Consuming API
Based on the directory structure of `./db` endpoints become valid. For example:

A call to `/authors/books` will look in the `./db` directory for `authors` folder then `books.json` and return that. You are free to nest the `./db` directory as deep as you want.

# Generating data

Generating dummies is easy. Extend the `Template` class and define your data structure and optionally the generation count, etc. Look at the `generators` dir for examples.

# Features
TODO

# Inspiration
When working on frontend projects, I usually use dummy json data to populate my views. There are 2 approaches for populating this data;
- By hand then upload to [jsonbin.io](https://jsonbin.io)
- Generate with [JSON Generator](https://next.json-generator.com) then copy to jsonbin then consume

I won't talk about the issue with generating by hand; but JSON Generator didn't feel intuitive enough for me. And the problem with `jsonbin` is that, when you update your JSON data, you get a different URL.

The URL `jsonbin` also provides is in the form of `/5e99697d5fa47104cea23c97`. A turn off.

Thus the birth of my json server
