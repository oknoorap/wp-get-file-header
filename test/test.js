import test from 'ava'
import wpFileHeader from '../index'

// Open style.css
const style = wpFileHeader('./test/style.css')

test('style header is object', async t => {
  await style.then(info => {
    t.is(typeof info, 'object')
  })
})

test('style header origins has 9 items', async t => {
  await style.then(info => {
    t.is(info.$origins().length, 9)
  })
})

test('all style header values are valid', async t => {
  await style.then(info => {
    t.is(info.themeName, `SentencePress`)
    t.is(info.themeUri, `http://chucknorris.google`)
    t.is(info.author, `Chuck Norris`)
    t.is(info.authorUri, `http://chucknorris.google`)
    t.is(info.description, `Example theme`)
    t.is(info.version, `1.0.0`)
    t.is(info.license, `GNU General Public License v2.0`)
    t.is(info.licenseUri, `http://www.gnu.org/licenses/gpl-2.0.html`)
    t.is(info.textDomain, `sentence_press`)
  })
})

test('style header `tags` is undefined', async t => {
  await style.then(info => {
    t.is(info.tags, undefined)
    t.false(info.tags === 'responsive')
  })
})

// Open page-template.php
const pageTemplate = wpFileHeader('./test/page-template.php')

test('page-template header is object', async t => {
  await pageTemplate.then(info => {
    t.is(typeof info, 'object')
  })
})

test('page-template header origins has 2 items', async t => {
  await pageTemplate.then(info => {
    t.is(info.$origins().length, 2)
  })
})

test('all page-template header values are valid', async t => {
  await pageTemplate.then(info => {
    t.is(info.templateName, 'Full-width layout')
    t.is(info.templatePostType, 'post, page, product')
  })
})
