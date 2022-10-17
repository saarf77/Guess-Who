'use strict'

const STORAGE_KEY = 'questsTreeDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  // Loading quests tree from storage if exists
  gQuestsTree = loadFromStorage(STORAGE_KEY) || _getDemoData()

  // Building new Quests tree if doesn't exist
  // if (!gQuestsTree) {
  //   gQuestsTree = _getDemoData()
  // }

  gCurrQuest = gQuestsTree
  gPrevQuest = null
  _saveQuestTreeToStorage()
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  gPrevQuest = gCurrQuest
  gCurrQuest = gPrevQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  const newQuest = createQuest(newQuestTxt)
  newQuest.no = gCurrQuest
  newQuest.yes = createQuest(newGuessTxt)

  gPrevQuest[lastRes] = newQuest

  _saveQuestTreeToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}

function _getDemoData() {
  const quest = createQuest('Male?')
  quest.no = createQuest('Rita')
  quest.yes = createQuest('Gandhi')
  return quest
}

function _saveQuestTreeToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}