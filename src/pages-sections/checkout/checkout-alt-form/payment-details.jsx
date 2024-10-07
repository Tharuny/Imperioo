import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import ButtonBase from "@mui/material/ButtonBase";
import FormControlLabel from "@mui/material/FormControlLabel";
import Heading from "./heading";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { months, years } from "data/months-years";
import { useDispatch,useSelector } from "react-redux";
import { postOrder } from "app/store/placeorderRedux/placeorderAction";


const PaymentDetails = ({
  values,
  errors,
  touched,
  handleChange,
  toggleHasVoucher,
  handleFieldValueChange
}) => {
  const [isCardInfoOpen, setIsCardInfoOpen] = useState(false);
  const [isUPIOpen, setIsUPIOpen] = useState(false);
  const [isNetBankingOpen, setIsNetBankingOpen] = useState(false);
  const [isWalletsOpen, setIsWalletsOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const dispatch = useDispatch();


  const cartData = useSelector((state) => state.cartModified.cartData)
  const toggleSection = (section) => {
    switch (section) {
      case "cardInfo":
        setIsCardInfoOpen(!isCardInfoOpen);
        break;
      case "upi":
        setIsUPIOpen(!isUPIOpen);
        break;
      case "netBanking":
        setIsNetBankingOpen(!isNetBankingOpen);
        break;
      case "wallets":
        setIsWalletsOpen(!isWalletsOpen);
        break;
      case "voucher":
        setIsVoucherOpen(!isVoucherOpen);
        break;
      default:
        break;
    }
  };

  const onClickPlaceOrder =  () => {
    console.log("ffff",cartData)
    dispatch(postOrder(cartData));
   alert("orderPlacedSuccessfully")
 }

  return (
    
    <Card sx={{ p: 3, mb: 3 }}>
        <Heading number={3} title="Payment-Details" />
       

      {/* Card Information */}
      <Box mb={3}>
        <ButtonBase
          disableRipple
          onClick={() => toggleSection("cardInfo")}
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          Credit / Debit / ATM Card
        </ButtonBase>

        <Collapse in={isCardInfoOpen}>
          <Box mt={3} gap={2} maxWidth="400px">
            {/* Card form fields */}
            <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth type="text" name="cardHolderName" onChange={handleChange} label="Enter Your Name" value={values.cardHolderName} error={!!touched.cardHolderName && !!errors.cardHolderName} helperText={touched.cardHolderName && errors.cardHolderName} />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField fullWidth type="number" name="cardNumber" onChange={handleChange} label="Enter Your Card Number" value={values.cardNumber} error={!!touched.cardNumber && !!errors.cardNumber} helperText={touched.cardNumber && errors.cardNumber} />
          </Grid>

          <Grid item sm={4} xs={12}>
            <TextField select fullWidth type="number" name="cardMonth" onChange={handleChange} value={values.cardMonth} label="Expire Card Month" error={!!touched.cardMonth && !!errors.cardMonth} helperText={touched.cardMonth && errors.cardMonth}>
              {months.map(item => <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>)}
            </TextField>
          </Grid>

          <Grid item sm={4} xs={12}>
            <TextField select fullWidth type="number" name="cardYear" onChange={handleChange} value={values.cardYear} label="Expire Card Year" error={!!touched.cardYear && !!errors.cardYear} helperText={touched.cardYear && errors.cardYear}>
              {years.map(item => <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>)}
            </TextField>
          </Grid>

          <Grid item sm={4} xs={12}>
            <TextField fullWidth type="number" name="cardCVC" label="CVC/CVV" value={values.cardCVC} onChange={handleChange} error={!!touched.cardCVC && !!errors.cardCVC} helperText={touched.cardCVC && errors.cardCVC} />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel label="Save this card" control={<Checkbox size="small" />} />
            {/*  onChange={e} - removed from above component */}
          </Grid>

          
          </Grid>


            <Button variant="contained" color="primary" type="button">
              PAY
            </Button>
          </Box>
        </Collapse>
      </Box>

      {/* UPI */}
      <Box mb={3}>
        <ButtonBase
          disableRipple
          onClick={() => toggleSection("upi")}
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          UPI
        </ButtonBase>

        <Collapse in={isUPIOpen}>
          <FlexBox mt={3} gap={2} maxWidth="400px">
            <TextField
              fullWidth
              type="text"
              name="UpiID"
              onChange={handleChange}
              label="Enter UPI ID"
              value={values.UpiID}
            />

            <Button variant="contained" color="primary" type="button">
              PAY
            </Button>
          </FlexBox>
          < p  >Pay by an UPI App</p>
        </Collapse>
      </Box>

    
       
    

      {/* Net Banking */}
      <Box mb={3}>
        <ButtonBase
          disableRipple
          onClick={() => toggleSection("netBanking")}
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          Net Banking
        </ButtonBase>

        <Collapse in={isNetBankingOpen}>
        <h3>Popular Banks</h3>

        
          {/* First Row */}
          <FlexBox mt={3} gap={2} maxWidth={400}>
            <TextField
              type="radio"
              onChange={handleChange}
              value="HDFC Bank"
              name="netBankingOption"
            />
            <label htmlFor="hdfc">HDFC Bank</label>
            <TextField
              type="radio"
              onChange={handleChange}
              value="ICICI Bank"
              name="netBankingOption"
            />
            <label htmlFor="icici">ICICI Bank</label>
            <TextField
              type="radio"
              onChange={handleChange}
              value="ICICI Bank"
              name="netBankingOption"
            />
            <label htmlFor="icici">Axis Bank</label>
          </FlexBox>

          {/* Second Row */}
          <FlexBox mt={3} gap={2}>
            <TextField
              type="radio"
              onChange={handleChange}
              value="State Bank of India"
              name="netBankingOption"
            />
            <label htmlFor="sbi">State Bank of India</label>
            <TextField
              type="radio"
              onChange={handleChange}
              value="Axis Bank"
              name="netBankingOption"
            />
            <label htmlFor="axis">Kotak Mahindra Bank</label>
          </FlexBox>
          <h3>Other Banks</h3>
          <FlexBox mt={3} gap={2}>
            <select 
           
            name="---Select Banks--" id="" placeholder="---Select Banks--">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            
            </select>
          </FlexBox>
        
        </Collapse>
      </Box>

      {/* Wallets */}
      <Box mb={3}>
        <ButtonBase
          disableRipple
          onClick={() => toggleSection("wallets")}
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          Wallets
        </ButtonBase>

        <Collapse in={isWalletsOpen}>
          <FlexBox mt={3} gap={2} maxWidth="400px">
            <TextField
              fullWidth
              type="text"
              name="WalletID"
              onChange={handleChange}
              label="Enter Wallet ID"
              value={values.WalletID}
            />
            <Button variant="contained" color="primary" type="button">
              Apply
            </Button>
          </FlexBox>
        </Collapse>
      </Box>

      {/* COD */}
      <Box mb={3}>
        <ButtonBase
          disableRipple
          onClick={() => toggleSection("wallets")}
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          Cash On Deliery
        </ButtonBase>

        <Collapse in={isWalletsOpen}>
          <FlexBox mt={3} gap={2} maxWidth="400px">
            <p></p>
            <Button variant="contained" color="primary" type="button">
              Apply
            </Button>
          </FlexBox>
        </Collapse>
      </Box>

      {/* Voucher Action Field */}
      <Box mb={3}>
        <ButtonBase
          disableRipple
          onClick={() => toggleSection("voucher")}
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          I have a voucher
        </ButtonBase>

        <Collapse in={isVoucherOpen}>
          <FlexBox mt={3} gap={2} maxWidth="400px">
            <TextField
              fullWidth
              name="voucher"
              value={values.voucher}
              onChange={handleChange}
              placeholder="Enter voucher code here"
            />
            <Button variant="contained" color="primary" type="button">
              Apply
            </Button>
          </FlexBox>
        </Collapse>
      </Box>

      <Button fullWidth type="submit" color="primary" variant="contained" onClick={onClickPlaceOrder}>
        Place Order
      </Button>
    </Card>
  );
};

export default PaymentDetails;
