// ==UserScript==
// @name         yahoo look
// @namespace    http://tampermonkey.net/
// @version      2024-11-12
// @description  try to take over the world!
// @author       You
// @match        https://auctions.yahoo.co.jp/seller/*
// @match        https://auctions.yahoo.co.jp/search/search?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yahoo.co.jp
// @grant        none
// @noframes
// ==/UserScript==

'use strict'

// preview
window.changePreviewImgPosition = img => {
  if (!img) return
  img.style.top = `${50 - img.clientHeight / 2}px`
}
$(`<style>
  .c-preview-img { position: absolute; z-index: 100; right: calc(100% + 10px); top: 0; max-width: 70vw; max-height: 70vh; }
  #showbox, #showbox div, #showbox img { height: auto !important; }
</style>`).appendTo(document.head)

$('.Product__imageData').on('mouseenter', event => {
  const el = event.target
  const url = el.getAttribute('src')
  if (!url) return
  const i = url.indexOf('?')
  const resultUrl = url.slice(0, i)
  $(el).closest('.Product__image').append(`<img class="c-preview-img" src="${resultUrl}" style="right: calc(100% + 10px); top: 0;" />`).find('.c-preview-img').on('load', event => changePreviewImgPosition(event.target))
})

$('.Product__imageData').on('mouseleave', event => {
  $(event.target).closest('.Product__image').find('.c-preview-img').remove()
})

// search
$('.Product__image').each(function() {
  const queryStr = $(this).closest('.Product').find('.Product__titleLink').attr('title')
  const url = `https://www.google.com/search?q=${encodeURIComponent(queryStr)}`
  const searchInGoogle = () => {
    window.open(url, '_blank')
  }
  $(this).append(`
    <a class="Product__button" style="right: 48px; text-decoration: none;" href="${url}" target="_blank">
      <div style="width: 32px; height: 32px; padding: 8px; border-radius: 50%; background-color: #ccc; box-sizing: border-box; color: #fff; line-height: 1; text-align: center; font-weight: bold">G</div>
    </a>
  `).find('div').on('click', searchInGoogle)
})
