import '../css/Button.css'

export default function Button (props) {

  return(
    <button type='button' onClick={props.onClick}>
      {props.text}
    </button>
  )

}