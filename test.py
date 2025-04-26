import requests
import json

# 基本的 API URL 配置
BASE_URL = "http://localhost:3000/renders"

def create_render_task(title_text="Hello, world!"):
    """创建一个新的渲染任务"""
    url = BASE_URL
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "titleText": title_text
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        # 返回 jobId
        result = response.json()
        print(f"任务创建成功，Job ID: {result['jobId']}")
        return result['jobId']
    else:
        print(f"任务创建失败，错误：{response.text}")
        return None

def get_task_status(job_id):
    """查询渲染任务的状态"""
    url = f"{BASE_URL}/{job_id}"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        # 返回任务状态信息
        status = response.json()
        print(f"任务状态: {json.dumps(status, indent=4)}")
        return status
    else:
        print(f"查询任务状态失败，错误：{response.text}")
        return None

def cancel_render_task(job_id):
    """取消渲染任务"""
    url = f"{BASE_URL}/{job_id}"
    
    response = requests.delete(url)
    
    if response.status_code == 200:
        # 返回取消成功的消息
        result = response.json()
        print(f"任务取消成功，消息: {result['message']}")
        return result
    else:
        print(f"取消任务失败，错误：{response.text}")
        return None

# 使用示例
if __name__ == "__main__":
    # Step 1: 创建渲染任务
    job_id = create_render_task("这是一个测试视频")
    
    if job_id:
        # Step 2: 获取任务状态
        get_task_status(job_id)
        
        # # Step 3: 取消任务（如果需要）
        # cancel_render_task(job_id)
