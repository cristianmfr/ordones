export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface MugElement {
  id: string;
  type: 'text' | 'image';
  position: Position;
  size: Size;
  rotation: number;
  opacity: number;
  zIndex: number;
  data: TextElementData | ImageElementData;
}

export interface TextElementData {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  textAlign: 'left' | 'center' | 'right';
}

export interface ImageElementData {
  src: string;
  originalWidth: number;
  originalHeight: number;
}

export interface MugConfig {
  color: string;
  type: 'standard' | 'magic' | 'thermal';
  size: '325ml' | '500ml';
}

export interface EditorState {
  elements: MugElement[];
  selectedElementId: string | null;
  mugConfig: MugConfig;
  viewSide: 'front' | 'back';
  history: EditorState[];
  historyIndex: number;
}

export interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType;
  component: React.ComponentType<any>;
}