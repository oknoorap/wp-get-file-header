import test from 'ava'
import wpFileHeader from './index'

// Open style.css
const style = wpFileHeader('./example/style.css')

test('style header is object', async t => {
  await style.then(info => {
    t.true(typeof info === 'object')
  })
})

test('style header origins has 9 items', async t => {
  await style.then(info => {
    t.true(info.$origins().length === 9)
  })
})

test('all style header values are valid', async t => {
  await style.then(info => {
    t.true(info.themeName === `SentencePress`)
    t.true(info.themeUri === `http://chucknorris.google`)
    t.true(info.author === `Chuck Norris`)
    t.true(info.authorUri === `http://chucknorris.google`)
    t.true(info.description === `Example theme`)
    t.true(info.version === `1.0.0`)
    t.true(info.license === `GNU General Public License v2.0`)
    t.true(info.licenseUri === `http://www.gnu.org/licenses/gpl-2.0.html`)
    t.true(info.textDomain === `sentence_press`)
  })
})

test('style header `tags` is undefined', async t => {
  await style.then(info => {
    t.true(info.tags === undefined)
    t.false(info.tags === 'responsive')
  })
})

// Open page-template.php
const pageTemplate = wpFileHeader('./example/page-template.php')

test('page-template header is object', async t => {
  await pageTemplate.then(info => {
    t.true(typeof info === 'object')
  })
})

test('page-template header origins has 2 items', async t => {
  await pageTemplate.then(info => {
    t.true(info.$origins().length === 2)
  })
})

test('all page-template header values are valid', async t => {
  await pageTemplate.then(info => {
    t.true(info.templateName === 'Full-width layout')
    t.true(info.templatePostType === 'post, page, product')
  })
})
