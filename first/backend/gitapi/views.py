from django.shortcuts import redirect
from django.shortcuts import render
from django.http import JsonResponse
import requests as re
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
def index(request):
    return JsonResponse({'message': 'okay'})


def github_login(request):
    # user_authorization_code = request.data
    # print(f'user code = {user_authorization_code}')
    # return JsonResponse({'message': user_authorization_code})
    try:
        client_id = os.environ.get('CLIENT_ID')
        redirect_url = os.environ.get('REDIRECT_URI')
        # client_secrets = os.environ.get('CLIENT_SECRETS')
        scope = "read:user"
        login_url=f'https://github.com/login/oauth/authorize?client_id={client_id}&redirect_url={redirect_url}&scope={scope}'
        context = {
            'login_url': login_url,
            'message': "승인 코드 발급 성공"
        }
        return JsonResponse(context)
        
    except:
        return JsonResponse({'error': '에러남'})


@api_view(['POST'])
def github_access_token(request):
    client_id = os.environ.get('CLIENT_ID')
    redirect_uri = os.environ.get('REDIRECT_URI')
    client_secret = os.environ.get('CLIENT_SECRETS')
    code = request.data.get("userCode")
    if code is None:
        return JsonResponse({'error': '승인 코드 없음'})

    API_URL = f"https://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={code}&redirect_uri={redirect_uri}"
    token_request = re.post(
        API_URL,
        headers={"Accept": "application/json"},
    )

    token = token_request.json()

    error = token.get("error", None)
    if error is not None:
        return JsonResponse({'error': error})

    return Response(token)