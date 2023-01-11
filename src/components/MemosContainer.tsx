import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { MemoItemObject } from "../classes/MemoItemObject";
import SvgMaterialSymbolsAdd from "../iconComponents/MaterialSymbolsAdd";
import memoService from "../services/memo-service";
import UserService from "../services/user.service";
import MemoItem from "./MemoItem";

function MemosContainer() {
  const [content, setContent] = useState<object[]>([]);

  const [isAddingNewOne, setIsAddingNewOne] = useState<boolean>(false);
  const [addingNewOneContent, setAddingNewOneContent] = useState<string>("");

  const [isUserError, setIsUserError] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if (!user) {
    //   useNavigate("/login")
    // }

    UserService.getAllMemos().then(
      (response) => {
        console.log(response ? "yeah there is" : "no there's no response");
        setContent(response.data);
        setIsUserError(false);
        // console.log(response.data);
      },
      (error) => {
        if (error && error.code === "ERR_BAD_REQUEST") {
          console.log("Error is indeed badrequest");
          setIsUserError(true);
        }
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );
  }, []);

  const deleteElementById = (id: number) => {
    memoService.delete(id).then((data) => {
      // console.log("returning " + JSON.stringify(data));
      let tmp = content.copyWithin(0, content.length);
      // console.log("tmp: " + JSON.stringify(tmp));
      tmp = tmp.filter((item) => item.id && item.id !== id);
      setContent(tmp);
    });
  };

  const onAddNewButtonClicked = (e: any) => {
    setIsAddingNewOne(!isAddingNewOne);
  };

  const onSaveButtonClicked = (e: any) => {
    console.log("post");
    if (addingNewOneContent.length > 0) {
      memoService.addNewMemo(addingNewOneContent).then((data) => {
        setIsAddingNewOne(false);
        console.log(data);
        setContent([...content, data]);
      });
    }
  };

  return (
    <div className="p-10">
      {isUserError ? (
        <h1 className="text-center text-2xl">
          Błąd logowania.{" "}
          <a
            className=" text-blue-600 underline cursor-pointer"
            onClick={(e) => navigate("/login")}
          >
            Zaloguj się ponownie!
          </a>
        </h1>
      ) : (
        <>
          <h1 className="text-center text-2xl">
            Oto twoje notatki, użytkowniku:
          </h1>

          <div className="py-1">
            <Button
              className="bg-blue-500"
              variant="contained"
              startIcon={<SvgMaterialSymbolsAdd className="" />}
              onClick={(e) => onAddNewButtonClicked(e)}
            >
              ADD
            </Button>
          </div>
          {isAddingNewOne ? (
            <div>
              <div className="pt-1">
                <TextField
                  fullWidth={true}
                  value={addingNewOneContent}
                  contentEditable="true"
                  multiline
                  onChange={(e) => setAddingNewOneContent(e.target.value)}
                ></TextField>
              </div>
              <div className="py-1 flex justify-between">
                <div className="w-40  pr-2 py-1">
                  <Button
                    className="bg-red-600"
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={(e) => onAddNewButtonClicked(e)}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="w-40  p-1">
                  <Button
                    className="bg-blue-500"
                    fullWidth
                    variant="contained"
                    onClick={(e) => onSaveButtonClicked(e)}
                  >
                    SAVE
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div></div>
          {/* <div>{JSON.stringify(content)}</div> */}
          <div>
            {Array.isArray(content)
              ? content.map(
                  (item: MemoItemObject) => {
                    if (item) {
                      return (
                        <div key={item.id}>
                          <MemoItem
                            item={item}
                            deleteElementById={deleteElementById}
                          />
                        </div>
                      );
                      // return <MemoItem(item) key={item.id} />;
                    }
                    return "none";
                  }
                  //item.sanitizedHtml
                  // <div dangerouslySetInnerHTML={{ item.sanitizedHtml }}> c</div>
                )
              : "Brak notatek, człowieku :(\nStwórz jakąś!"}
          </div>
        </>
      )}
    </div>
  );
}

export default MemosContainer;
