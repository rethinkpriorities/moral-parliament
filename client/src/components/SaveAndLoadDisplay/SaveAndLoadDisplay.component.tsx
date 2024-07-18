import React, { useState } from "react";
import {
  A,
  Button,
  Row,
  Column,
  Label,
  Input,
  Container,
} from "./SaveAndLoadDisplay.styles";
import { Title } from "../../styles/fonts";

interface SaveAndLoadDisplayProps {
  saveSheet: (name: string) => void;
  loadSheet: (url: string) => void;
  loadFile: (file: File) => void;
  sheetId: string | null;
  isSaving: boolean;
  openAsWindow: (name: string) => void;
}

export const SaveAndLoadDisplay = ({
  saveSheet,
  isSaving,
  loadSheet,
  loadFile,
  sheetId,
  openAsWindow,
}: SaveAndLoadDisplayProps) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Container>
      <Title>Save and Load</Title>
      <p>
        Your current configuration (parliament, worldviews, and projects) can be
        saved to CSVs or stored as Google Sheets. You can directly change the
        files, just mind the formatting.
      </p>
      <Row>
        <Column>
          <h3>Save</h3>
          <Label>Configuration Name</Label>
          <Input
            placeholder="My New Configuration"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <Button disabled={!name || isSaving} onClick={() => saveSheet(name)}>
            Save as Google sheet
          </Button>
          {sheetId && (
            <span>
              Link to saved sheet:{" "}
              <A
                target="_blank"
                href={`http://docs.google.com/spreadsheets/d/${sheetId}/edit`}
              >
                {sheetId.slice(0, 10)}
              </A>
            </span>
          )}
          <br />
          <Button disabled={!name} onClick={() => openAsWindow(name)}>
            Open CSV in window
          </Button>
        </Column>
        <Column>
          <h3>Load</h3>
          <Label>Sheet Id</Label>
          <Input
            placeholder="1g_oUW-t3oyukPic7BrLcPYIKGMQN-G-1oisQH4VeNtk"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button disabled={!url} onClick={() => loadSheet(url)}>
            Load from Google sheet
          </Button>
          <br />
          <Input type="file" onChange={handleFileChange} />
          <Button disabled={!file} onClick={() => file && loadFile(file)}>
            Load local CSV
          </Button>
        </Column>
      </Row>
    </Container>
  );
};
