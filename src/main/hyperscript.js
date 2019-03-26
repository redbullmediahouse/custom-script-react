// inspired by https://github.com/ohanhi/hyperscript-helpers
import {h} from 'preact';

const isValidString = param => typeof param === 'string' && param.length > 0;

const startsWith = (string, start) => string[0] === start;

const isSelector = param =>
isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));

const createTag = tagName => (first, ...rest) => {
    if (isSelector(first)) {
        return h(tagName + first, ...rest);
    } else if (typeof first === 'undefined') {
        return h(tagName);
    } else {
        if (tagName === 'a' && first.target === '_blank') {
            first.rel = 'noopener';
        }
        return h(tagName, first, ...rest);
    }
};

const a = createTag('a');
const abbr = createTag('abbr');
const acronym = createTag('acronym');
const address = createTag('address');
const area = createTag('area');
const article = createTag('article');
const aside = createTag('aside');
const audio = createTag('audio');
const b = createTag('b');
const base = createTag('base');
const basefont = createTag('basefont');
const big = createTag('big');
const blockquote = createTag('blockquote');
const body = createTag('body');
const br = createTag('br');
const button = createTag('button');
const canvas = createTag('canvas');
const caption = createTag('caption');
const center = createTag('center');
const cite = createTag('cite');
const code = createTag('code');
const col = createTag('col');
const colgroup = createTag('colgroup');
const command = createTag('command');
const content = createTag('content');
const data = createTag('data');
const datalist = createTag('datalist');
const dd = createTag('dd');
const del = createTag('del');
const details = createTag('details');
const dfn = createTag('dfn');
const dialog = createTag('dialog');
const dir = createTag('dir');
const div = createTag('div');
const dl = createTag('dl');
const dt = createTag('dt');
const element = createTag('element');
const em = createTag('em');
const embed = createTag('embed');
const fieldset = createTag('fieldset');
const figcaption = createTag('figcaption');
const figure = createTag('figure');
const font = createTag('font');
const footer = createTag('footer');
const form = createTag('form');
const h1 = createTag('h1');
const h2 = createTag('h2');
const h3 = createTag('h3');
const h4 = createTag('h4');
const h5 = createTag('h5');
const h6 = createTag('h6');
const head = createTag('head');
const header = createTag('header');
const hgroup = createTag('hgroup');
const hr = createTag('hr');
const html = createTag('html');
const i = createTag('i');
const iframe = createTag('iframe');
const image = createTag('image');
const img = createTag('img');
const input = createTag('input');
const label = createTag('label');
const legend = createTag('legend');
const li = createTag('li');
const link = createTag('link');
const listing = createTag('listing');
const main = createTag('main');
const map = createTag('map');
const mark = createTag('mark');
const math = createTag('math');
const menu = createTag('menu');
const menuitem = createTag('menuitem');
const meta = createTag('meta');
const multicol = createTag('multicol');
const nav = createTag('nav');
const nobr = createTag('nobr');
const noembed = createTag('noembed');
const noframes = createTag('noframes');
const noscript = createTag('noscript');
const object = createTag('object');
const ol = createTag('ol');
const optgroup = createTag('optgroup');
const option = createTag('option');
const output = createTag('output');
const p = createTag('p');
const param = createTag('param');
const picture = createTag('picture');
const plaintext = createTag('plaintext');
const pre = createTag('pre');
const progress = createTag('progress');
const q = createTag('q');
const rb = createTag('rb');
const rp = createTag('rp');
const rt = createTag('rt');
const rtc = createTag('rtc');
const ruby = createTag('ruby');
const s = createTag('s');
const samp = createTag('samp');
const script = createTag('script');
const section = createTag('section');
const select = createTag('select');
const shadow = createTag('shadow');
const slot = createTag('slot');
const small = createTag('small');
const source = createTag('source');
const spacer = createTag('spacer');
const span = createTag('span');
const strike = createTag('strike');
const strong = createTag('strong');
const style = createTag('style');
const sub = createTag('sub');
const summary = createTag('summary');
const sup = createTag('sup');
const svg = createTag('svg');
const table = createTag('table');
const tbody = createTag('tbody');
const td = createTag('td');
const template = createTag('template');
const textarea = createTag('textarea');
const tfoot = createTag('tfoot');
const th = createTag('th');
const thead = createTag('thead');
const time = createTag('time');
const title = createTag('title');
const tr = createTag('tr');
const track = createTag('track');
const tt = createTag('tt');
const u = createTag('u');
const ul = createTag('ul');
const video = createTag('video');

export {a, abbr, acronym, address, area, article, aside, audio, b, base, basefont, big, blockquote, body, br, button, canvas, caption, center, cite, code, col, colgroup, command, content, data, datalist, dd, del, details, dfn, dialog, dir, div, dl, dt, element, em, embed, fieldset, figcaption, figure, font, footer, form, h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html, i, iframe, image, img, input, label, legend, li, link, listing, main, map, mark, math, menu, menuitem, meta, multicol, nav, nobr, noembed, noframes, noscript, object, ol, optgroup, option, output, p, param, picture, plaintext, pre, progress, q, rb, rp, rt, rtc, ruby, s, samp, script, section, select, shadow, slot, small, source, spacer, span, strike, strong, style, sub, summary, sup, svg, table, tbody, td, template, textarea, tfoot, th, thead, time, title, tr, track, tt, u, ul, video};
