#!/usr/bin/env python3
"""
画像最適化スクリプト
ポートフォリオサイトの画像ファイルを適切なサイズに最適化します。
"""

from PIL import Image
import os
import sys

def optimize_image(input_path, output_path, max_width=None, max_height=None, quality=85):
    """
    画像を最適化する関数
    
    Args:
        input_path (str): 入力画像のパス
        output_path (str): 出力画像のパス
        max_width (int): 最大幅（ピクセル）
        max_height (int): 最大高さ（ピクセル）
        quality (int): JPEG品質（1-100）
    """
    try:
        # 画像を開く
        with Image.open(input_path) as img:
            print(f"元の画像サイズ: {img.size} ({input_path})")
            
            # RGBAをRGBに変換（JPEG保存のため）
            if img.mode in ('RGBA', 'LA'):
                # 白い背景を作成
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'RGBA':
                    background.paste(img, mask=img.split()[-1])  # アルファチャンネルをマスクとして使用
                else:
                    background.paste(img)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # サイズ調整
            if max_width or max_height:
                # アスペクト比を保持してリサイズ
                img.thumbnail((max_width or img.width, max_height or img.height), Image.Resampling.LANCZOS)
                print(f"リサイズ後: {img.size}")
            
            # 最適化して保存
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # ファイルサイズを確認
            original_size = os.path.getsize(input_path)
            optimized_size = os.path.getsize(output_path)
            reduction = ((original_size - optimized_size) / original_size) * 100
            
            print(f"最適化完了: {output_path}")
            print(f"ファイルサイズ: {original_size:,} bytes → {optimized_size:,} bytes")
            print(f"削減率: {reduction:.1f}%")
            print("-" * 50)
            
    except Exception as e:
        print(f"エラーが発生しました: {e}")
        return False
    
    return True

def main():
    """メイン処理"""
    images_dir = "images"
    
    # 最適化設定
    optimizations = [
        {
            "input": "okamuralogo.png",
            "output": "okamuralogo_optimized.jpg",
            "max_height": 120,  # ロゴは40pxで表示されるが、高解像度ディスプレイ対応で3倍
            "quality": 90
        },
        {
            "input": "kenjiTop.png", 
            "output": "kenjiTop_optimized.jpg",
            "max_width": 600,  # 300pxで表示されるが、高解像度ディスプレイ対応で2倍
            "max_height": 600,
            "quality": 85
        },
        {
            "input": "hime.jpg",
            "output": "hime_optimized.jpg", 
            "max_width": 800,  # 背景画像として使用される可能性を考慮
            "quality": 80
        }
    ]
    
    print("画像最適化を開始します...")
    print("=" * 50)
    
    success_count = 0
    for opt in optimizations:
        input_path = os.path.join(images_dir, opt["input"])
        output_path = os.path.join(images_dir, opt["output"])
        
        if not os.path.exists(input_path):
            print(f"ファイルが見つかりません: {input_path}")
            continue
            
        if optimize_image(
            input_path, 
            output_path, 
            opt.get("max_width"), 
            opt.get("max_height"), 
            opt["quality"]
        ):
            success_count += 1
    
    print(f"\n最適化完了: {success_count}/{len(optimizations)} ファイル")
    print("\n次のステップ:")
    print("1. 最適化された画像を確認してください")
    print("2. 問題がなければ、HTMLファイルの画像パスを更新してください")
    print("3. 元の画像ファイルをバックアップ後、削除してください")

if __name__ == "__main__":
    main()