import requests
import json
import re

PLACE_NAME = 'Store'
TOTAL = 'Total'
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
    items = re.findall("([A-Za-z0-9][A-Za-z_\s$()]*[0-9]+[\s]*\.\s*[0-9]+)", receipt)
    for item in items:
        name, price = match_regex(item)
        if name and price:
            json_receipt[name] = price
            if name == TOTAL:
                break
    json_receipt = json.dumps(json_receipt)
    return json_receipt

def match_regex(string):
    name_matches = re.search("([A-Za-z0-9_\s()]*)", string)
    price_matches = re.search("([0-9\s]+\.[\s0-9]+)", string)
    if name_matches and price_matches:
        return process_string(name_matches.group(0)), process_num(price_matches.group(0))
    else:
        return "" , ""

def process_string(string):
    return_string = string.strip()
    return_string = return_string.strip('0123456789')
    return_string = return_string.strip()
    return_string = remove_keywords(return_string)
    return return_string

def remove_keywords(string):
    return_string = string
    if len(string) <= 3:
        return_string = ""
    if bool(re.search('(?i)(subt)', string)):
        return_string = ""
    elif bool(re.search('(?i)(tax)', string)):
        return_string = "Tax"
    elif bool(re.search('(?i)(total)', string)) or bool(re.search('(?i)(tota)', string)):
        return_string = "Total"
    elif bool(re.search('(?i)(tip)', string)):
        return_string = ""
    return return_string

def process_num(string):
    return_string = re.sub("\s+", "", string)
    return return_string

def main():
    api_key = 'K83047060888957'
    file_path = './app/controllers/scanner_util/uploads/current_receipt.jpg'
    return_file = ocr_receipt(filename=file_path, api_key=api_key, overlay=False)
    print(return_file)
    

if __name__ == "__main__":
    main()