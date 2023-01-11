import { Button, Paper, TextField } from "@mui/material";
import { color } from "@mui/system";
import { useEffect, useState } from "react";
import { MemoItemObject } from "../classes/MemoItemObject";
import memoService from "../services/memo-service";

export default function MemoItem({ item, deleteElementById }) {
  const [isEditingHere, setIsEditingHere] = useState<boolean>(false);
  const [contentText, setContentText] = useState<string>("");

  const [parsedInnerHtml, setParsedInnerHtml] = useState<string>("");

  useEffect(() => {
    setContentText(item.memoContent);
    setParsedInnerHtml(item.sanitizedHtml);
  }, []);

  const onSaveButtonClicked = (e: any) => {
    setIsEditingHere(false);
    // const newItem = memoService.addNewMemo(contentText);
    memoService.put(contentText, item.id).then((data) => {
      console.log(data);
      setContentText(data.memoContent);
      setParsedInnerHtml(data.sanitizedHtml);
    });
  };

  const onDeleteButtonClicked = (e: any) => {
    deleteElementById(item.id);
  };

  if (item.sanitizedHtml) {
    return (
      <>
        <div className="py-1">
          <Paper elevation={2} sx={{ background: "#FEF3C7" }}>
            <div className="flex justify-between">
              <div
                className="p-1"
                dangerouslySetInnerHTML={{ __html: parsedInnerHtml }}
              ></div>
              <div className="w-40 flex-col">
                <div className="min-w-full p-1">
                  <Button
                    className="bg-blue-500"
                    fullWidth
                    variant="contained"
                    onClick={(e) => setIsEditingHere(!isEditingHere)}
                  >
                    EDIT
                  </Button>
                </div>
                <div className="min-w-full p-1">
                  <Button
                    className="bg-red-600"
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={(e) => onDeleteButtonClicked(e)}
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            </div>
            {isEditingHere ? (
              <div className="flex justify-between">
                <div className="p-1 grow">
                  <TextField
                    fullWidth
                    value={contentText}
                    //contentEditable="true"
                    inputMode="text"
                    multiline
                    onChange={(e) => setContentText(e.target.value)}
                  ></TextField>
                </div>
                <div className="w-40 flex-col">
                  <div className="p-1">
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
          </Paper>
        </div>
        {/* <TextField
          fullWidth
          contentEditable="false"
          multiline
          // disabled
          value={item.memoContent}
        /> */}
      </>
    );
  } else return <div className="p-4">No data available</div>;
}
