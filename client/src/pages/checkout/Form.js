
function Form() {
  return (
    <form>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" placeholder="Enter your Name.." />
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="text" className="form-control" placeholder="Enter your Email.." />
      </div>

      <div className="form-group">
        <label className="form-label">Address</label>
        <input type="text" className="form-control" placeholder="Enter your Address.." />
      </div>

      <div className="form-group">
        <label className="form-label">City</label>
        <select type="text" className="form-control" placeholder="Enter your City.." >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" placeholder="Enter your Zip Code.." />
      </div>

      <input type="submit" value="Pay Now" className="btn btn-primary mt-3" />
    </form>
  )
}

export default Form;
