import { useForm } from "react-hook-form";
import css from "./AddProduct.module.css";
import { ProductModel } from "../../../Models/ProductModel";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { productService } from "../../../Services/ProductService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { useEffect } from "react";

export function AddProduct(): JSX.Element {
  const { register, handleSubmit, setValue, reset } = useForm<ProductModel>();

  const userId = useSelector<AppState, number>((state) => state.user.id);

  const navigate = useNavigate();

  useEffect(() => {
    setValue("quantityPerBox", 0);
    setValue("orderByBox", 0);
    setValue("orderByWeight", 0);
  }, [setValue]);

  async function send(product: ProductModel) {
    try {
      product.imageName = (product.imageName as unknown as FileList)[0];
      await productService.addProduct(product, userId);
      notify.success("Product has been added");
      navigate("/products");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className="AddProduct">
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          width: "400px",
          "& > :not(style)": {
            mb: 2,
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(send)}
      >
        <TextField
          id="outlined-basic"
          label="Product code"
          variant="outlined"
          fullWidth
          type="number"
          {...register("productCode")}
          required
        />
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          fullWidth
          type="text"
          {...register("name")}
          required
        />
        <input
          id="imageName"
          type="file"
          accept="image/*"
          {...register("imageName")}
          required
        />

        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          {...register("price")}
          required
        />

        <input type="hidden" {...register("quantityPerBox")} />
        <input type="hidden" {...register("orderByBox")} />
        <input type="hidden" {...register("orderByWeight")} />

        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled button group"
        >
          <Button
            type="submit"
            sx={{
              backgroundColor: "green",
            }}
          >
            Send
          </Button>
          <Button
            type="button"
            onClick={() => reset()}
            sx={{ backgroundColor: "red" }}
          >
            Reset
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
}
