import requests
import json

def ocr_space_file(filename, api_key, overlay=False, tabulate=True, language='eng'):
    """ OCR.space API request with local file.
    :param filename: Your file path & name.
    :param overlay: Is OCR.space overlay required in your response.
                    Defaults to False.
    :param api_key: OCR.space API key.
    :param language: Language code to be used in OCR.
                    List of available language codes can be found on https://ocr.space/OCRAPI
                    Defaults to 'en'.
    :return: Result in JSON format.
    """

    payload = {'isOverlayRequired': overlay,
               'apikey': api_key,
               'language': language,
               'isTable': tabulate,
               }
    with open(filename, 'rb') as f:
        r = requests.post('https://api.ocr.space/parse/image',
                          files={filename: f},
                          data=payload,
                          )
    return r.content.decode()


def main():
    api_key = 'K83047060888957'
    file_path = './sample_data/1012-receipt.jpg'
    return_file = ocr_space_file(filename=file_path, api_key=api_key, overlay=False)
    return_json = json.loads(return_file)
    print(return_json['ParsedResults'][0]['ParsedText'])

if __name__ == "__main__":
    main()