import './index.css'

function Form() {
  return (
    <form className="forminput">
      <input type="text" className="forminput" placeholder="Enter your Name.." />
      <input type="text" className="forminput" placeholder="Enter your Email.." />
      <input type="text" className="forminput" placeholder="Enter your Address.." />
      <input type="text" className="forminput" placeholder="Enter your City.." />
      <input type="text" className="forminput" placeholder="Enter your Zip Code.." />
      <input type="submit" value="Pay Now" className="submitbutton" />
    </form>
  )
}

export default Form;
