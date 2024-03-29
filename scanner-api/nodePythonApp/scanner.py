import requests
import json
import re

PLACE_NAME = 'Place Name'

def ocr_receipt(filename, api_key, overlay=False, tabulate=True, language='eng'):
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
    ocr_content = r.content.decode()
    ocr_content_json = json.loads(ocr_content)
    return_json = convert_to_json(ocr_content_json['ParsedResults'][0]['ParsedText'])
    return return_json

def convert_to_json(receipt):
    json_receipt = {}
    lineiterator = receipt.splitlines()
    json_receipt[PLACE_NAME] = process_string(lineiterator[0])
    for line in lineiterator:
        name, price = match_regex(line)
        if name and price:
            json_receipt[name] = price
    return json_receipt

def match_regex(string):
    name_matches = re.search("([A-Za-z_\s]*)", string)
    price_matches = re.search("([0-9]+\.[0-9]{2})", string)
    if name_matches and price_matches:
        return process_string(name_matches.group(0)), price_matches.group(0)
    else:
        return "" , ""

def process_string(string):
    return_string = string.strip('\n')
    return_string = return_string.strip('\t')
    return return_string

def main():
    api_key = 'K83047060888957'
    file_path = './sample_data/1012-receipt.jpg'
    return_file = ocr_receipt(filename=file_path, api_key=api_key, overlay=False)
    print(return_file)
    

if __name__ == "__main__":
    main()