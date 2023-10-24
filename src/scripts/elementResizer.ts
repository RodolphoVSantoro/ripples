/**
    Não entendi muito bem o objetivo desse arquivo, mas no geral não é bom mexer no DOM diretamente assim quando se está usando Vue ou qualquer outro framework.
 */

function getChildrenElement(parent: HTMLElement, child: string): HTMLElement[] | null {
    const childrenElement = parent.getElementsByClassName(child);
    return childrenElement as unknown as HTMLElement[];
}

export function resizerFromDiv(containerDiv: HTMLElement) {
    const handlers = getChildrenElement(containerDiv, 'resizer');
    //TODO: add css class to containerDiv if any needed class is missing 
    if (!handlers || handlers.length === 0) {
        throw new Error('No handlers found');
    }
    //TODO: add css class to handlers if any needed class is missing
    const boxes = getChildrenElement(containerDiv, 'horizontal_resize');
    if (!boxes || boxes.length === 0) {
        throw new Error('No boxes found');
    }
    //TODO: add css class to boxes if any needed class is missing
    if (handlers.length + 1 !== boxes.length) {
        throw new Error('Handlers and boxes do not match, there should be one more box than handlers');
    }
    resizeHandlers(containerDiv, handlers, boxes);
}

function resizeHandlers(parent: HTMLElement, handlers: HTMLElement[], boxes: HTMLElement[]) {
    for (let i = 0; i < handlers.length; i++) {
        resizeHandlerN(parent, handlers, boxes, i);
    }
}
function resizeHandlerN(parent: HTMLElement, handlers: HTMLElement[], boxes: HTMLElement[], n: number) {
    if (n >= handlers.length) {
        throw new Error(`Index ${n} out of range on handlers(size ${handlers.length}})`);
    }
    if (n >= boxes.length) {
        throw new Error(`Index ${n} out of range on boxes(size ${boxes.length}})`);
    }
    const handler = handlers[n];
    const box = boxes[n];
    let isHandlerDragging = false;
    let handlerStart = 0;

    document.addEventListener('mousedown', function (event) {
        // If mousedown event is fired from .handler, toggle flag to true
        if (event.target === handler) {
            isHandlerDragging = true;
            handlerStart = 0;
            for (let i = 0; i < n; i++) {
                const boxWidth = handlers[i].offsetWidth;
                const handlerWidth = boxes[i].offsetWidth;
                handlerStart += (handlerWidth + boxWidth);
            }
        }
    });

    document.addEventListener('mousemove', function (event) {
        // Don't do anything if dragging flag is false
        if (!isHandlerDragging) {
            return false;
        }

        // Get offset
        const containerOffsetLeft = parent.offsetLeft;

        // Get x-coordinate of pointer relative to container
        let pointerRelativeXpos = event.clientX - containerOffsetLeft - handlerStart;

        // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
        let boxAminWidth = 0;

        // Resize box A
        // * 8px is the left/right spacing between .handler and its inner pseudo-element
        // * Set flex-grow to 0 to prevent it from growing
        box.style.width = String(Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
        box.style.flexGrow = '0';
    });

    document.addEventListener('mouseup', function (_event) {
        // Turn off dragging flag when user mouse is up
        isHandlerDragging = false;
    });
}

/*
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background-color: #1e1e1e;
  color: white;
  height: 95dvh;
  min-width: 100dvw;
}

.boxA {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #1e1e1e;
  width: 16dvw;
  resize: horizontal;
  height: 100%;
  border: solid 2px black;
  flex: 1 1 auto;
}

.boxB { 
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #1e1e1e;
  width: 47dvw;
  resize: horizontal;
  height: 100%;
  border: solid 2px black;
  flex: 1 1 auto;
}

.boxC {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #1e1e1e;
  width: 37dvw;
  resize: horizontal;
  height: 100%;
  border: solid 2px black;
  flex: 1 1 auto;
}

.handler {
  width: 20px;
  padding: 0;
  cursor: ew-resize;
  flex: 0 0 auto;
  width: 5px;
  height: 100%;
  background-color: #000;
  cursor: col-resize;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
*/