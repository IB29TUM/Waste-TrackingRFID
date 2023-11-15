import numpy as np
import cv2
import pygetwindow as gw
from PIL import ImageGrab
from ultralytics import YOLO
import matplotlib.pyplot as plt
import time


def screen_record():
    cv2.namedWindow("Window Capture", cv2.WINDOW_NORMAL)
    frame_counter = 0
    save_path = './waste/'
    model = YOLO('best.pt')


    while True:

        windows = gw.getWindowsWithTitle('SICK Vision Cockpit')
        if windows:
            window = windows[0]
            x, y, width, height = window.left, window.top, window.width, window.height

            img = ImageGrab.grab(bbox=(x, y, x + width, y + height))
            img_np = np.array(img)
            frame = cv2.cvtColor(img_np, cv2.COLOR_BGR2RGB)

            cv2.imshow("Window Capture", frame)

            cropped_frame = frame[204:, :, :]  # Adjust this line to change the crop area

            frame_prediction = model(cropped_frame)
            for object in frame_prediction:
                idx = int(object.boxes.cls[0])
                #print(idx)
                obj_cls = object.names[idx]
                print(obj_cls)
                res_plotted =object.plot()
                #cv2.imshow("result", res_plotted)
                frame_file_name = f"{save_path}/frame_{frame_counter:06d}.png"
                cv2.imwrite(frame_file_name, res_plotted)  # Save the cropped frame
                #cv2.waitKey(0)

            frame_counter += 1

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        else:
            print("Window not found")
            break
        time.sleep(0.5)

    cv2.destroyAllWindows()

screen_record()