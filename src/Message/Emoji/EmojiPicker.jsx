import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { RiEmojiStickerLine } from 'react-icons/ri'

const EmojiPickerApp = ({ textReference, setInput, input, showPicker, setShowPicker, setShowAttachments }) => {

  const [cursorPointer, setCursorPointer] = useState()

  // set cursor ponter
  useEffect(() => {
    textReference.current.selectionEnd = cursorPointer;
  }, [cursorPointer])

  // handle send emoji
  const handleEmoji = async (emoji_data, event) => {
    // console.log(emoji_data);
    const { emoji } = emoji_data
    const ref = textReference.current
    ref.focus()
    const start = input.substring(0, ref.selectionStart)
    const end = input.substring(ref.selectionStart)
    const newText = start + emoji + end
    setInput(newText)
    setCursorPointer(start.length + emoji.length)
  }

  return (
    <div>
      <div
        onClick={() => {
          setShowAttachments(false)
          setShowPicker((prev) => !prev)
        }}
        className="flex justify-center items-center gap-2 px-5">
        <RiEmojiStickerLine className="text-3xl text-black cursor-pointer" />
      </div>
      {/* Emoji picker here */}
      {
        showPicker ? <div className='openEmojiAnimation absolute bottom-[80px] left-[-0.5px]'>
          <EmojiPicker
            theme='dark'
            onEmojiClick={handleEmoji}

          />
        </div> : null
      }
    </div>
  )
}

export default EmojiPickerApp