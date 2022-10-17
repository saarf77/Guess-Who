'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

$('.modal-footer .btn-primary').click(onRestartGame)
$('.modal-footer .btn-secondary').click(() => $('.modal').hide())

function init() {
  createQuestsTree()
}

function onStartGuessing() {
  $('.game-start').hide()

  renderQuest()
  $('.quest').show()
}

function renderQuest() {
  // its text by the currQuest text
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  const res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    const $elModal = $('.modal')
    if (res === 'yes') {
      $elModal.find('h5').text('Victorious')
      $elModal.find('p').text('Victorious')
      $elModal.find('.btn-secondary').text(`Close`)
      // $('.modal h5').text('Victorious')
      // $('.modal p').text('I made it correctly anoter time!')
    } else {
      $elModal.find('h5').text('I lost 😮')
      $elModal.find('p').text(`I didn't make it this time, maybe you could teach me?`)
      $elModal.find('.btn-secondary').text(`Help me here`)

      $('.new-quest').show()
    }
    $elModal.show()
    $('.quest').hide()

  } else {
    gLastRes = res

    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  const newGuess = $('#newGuess').val().trim()
  const newQuest = $('#newQuest').val().trim()

  if (!newGuess || !newQuest) return
  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.modal').hide()
  $('.new-quest').hide()
  $('.game-start').show()
  $('.modal').hide()
  gLastRes = null
  init()
}
