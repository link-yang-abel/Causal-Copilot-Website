from fastapi import APIRouter
from fastapi import UploadFile, File

router = APIRouter()

files_path = '/Users/link-yang/Projects/stephen_projects/abel_projects/causal-copilot-website/backend/media'

@router.post('/upload_file/')
async def upload_file(file: UploadFile = File(...)):
    """
    使用UploadFile类的优势：
    1.文件开始存储在内存中，使用内存达到阈值后，将被保存在磁盘中
    2.适合于图片、视频大文件
    3.可以获取上传的文件的元数据，如文件名，创建时间等
    4.有文件对象的异步接口
    5.上传的文件是Python文件对象，可以使用write()、read()、seek()、close()等操做
    :param file:
    :return:
    """
    with open(f"{files_path}/{file.filename}", 'wb') as f:
        for i in iter(lambda: file.file.read(1024 * 1024 *10), b''):
            f.write(i)
    f.close()
    return { "file_name": file.filename }
