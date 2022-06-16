import { CardContent, Box } from "@mui/material";
import Card from "@mui/material/Card";
import data from "../../data/wishlistdata.json";
import { FaHeart } from "react-icons/fa";

const Profile = () => {
  let products = data;
  const clickHandler = () => {
    alert("Product will be removed from the list by backend.");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box display="inline-block" m={2} pt={3} padding={5}>
        <ul style={{ listStyleType: "none" }}>
          <br />
          <span style={{ fontFamily: "Times New Roman", fontSize: "50px" }}>
            &nbsp; Favourites
          </span>

          <br />
          <br />
          {products &&
            products.map((product) => (
              <Card variant="outlined" sx={{ minWidth: 275 }} m={10}>
                <CardContent>
                  <li key={product.Id}>
                    <img
                      src={product.picture}
                      alt="NA"
                      width="128px"
                      height="128px"
                    />
                    <br />
                    <br />
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <span style={{ color: "rgb(0, 191, 255)" }}>
                              Product Name:
                            </span>
                          </td>

                          <td>
                            <span>{product.name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ color: "orange" }}>
                              Product Type:
                            </span>
                          </td>

                          <td>
                            <span>{product.type}</span>
                          </td>
                        </tr>
                        <tr>
                          <td align="left">
                            <span onClick={clickHandler}>
                              <FaHeart />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                </CardContent>
              </Card>
            ))}
        </ul>
      </Box>
    </div>
  );
};
export default Profile;
