// DOM要素の取得
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-pills-container');
const navLinks = document.querySelectorAll('.nav-pill');
const header = document.querySelector('.header');

// ハンバーガーメニューの制御
function toggleMobileMenu() {
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
    if (navMenu) {
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
}

// ナビゲーションリンクのクリック処理
function handleNavLinkClick(e) {
    const href = e.target.getAttribute('href');
    
    // 外部リンクの場合はそのまま処理
    if (href.startsWith('http') || href.startsWith('mailto')) {
        return;
    }
    
    // 内部リンクの場合
    e.preventDefault();
    
    // モバイルメニューを閉じる
    if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // スムーズスクロール
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // アクティブリンクの更新
        updateActiveNavLink(href);
    }
}

// アクティブナビゲーションリンクの更新
function updateActiveNavLink(activeHref) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeHref) {
            link.classList.add('active');
        }
    });
}

// スクロール時のヘッダー処理
function handleScroll() {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('scrolled', scrolled);
    
    // 現在のセクションに基づいてアクティブリンクを更新
    updateActiveNavLinkOnScroll();
}

// スクロール位置に基づくアクティブリンク更新
function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = header.offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = '#' + section.id;
        }
    });
    
    if (currentSection) {
        updateActiveNavLink(currentSection);
    }
}

// スクロールアニメーション
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// プレゼンテーションビューア
class PresentationViewer {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.slidesWrapper = document.querySelector('.slides-wrapper');
        this.slideCounter = document.querySelector('.slide-counter');
        this.prevBtn = document.querySelector('.btn-prev');
        this.nextBtn = document.querySelector('.btn-next');
        this.fullscreenBtn = document.querySelector('.btn-fullscreen');
        
        this.initSlides();
        this.bindEvents();
        this.updateUI();
    }
    
    initSlides() {
        this.slides = [
            {
                title: "岡村研嗣",
                subtitle: "ポートフォリオプレゼンテーション",
                content: `
                    <div class="slide-content single-column">
                        <h2>自己紹介とキャリア概要</h2>
                        <p style="font-size: 1.2rem; color: #86868b; margin-top: 20px;">
                            EC事業運営での豊富な経験を活かし、<br>
                            データドリブンな意思決定と顧客志向のアプローチで<br>
                            ビジネス成果を創出してきました。
                        </p>
                    </div>
                `
            },
            {
                title: "基本情報",
                content: `
                    <div class="slide-content">
                        <div>
                            <h2>プロフィール</h2>
                            <ul>
                                <li><strong>氏名:</strong> 岡村研嗣</li>
                                <li><strong>年齢:</strong> 32歳</li>
                                <li><strong>居住地:</strong> 東京都</li>
                                <li><strong>最終学歴:</strong> 大学卒業</li>
                                <li><strong>職歴:</strong> 8年</li>
                                <li><strong>専門分野:</strong> EC事業運営</li>
                            </ul>
                        </div>
                        <div>
                            <h2>連絡先</h2>
                            <ul>
                                <li><strong>Email:</strong> contact@okamura-portfolio.com</li>
                                <li><strong>LinkedIn:</strong> linkedin.com/in/okamura-kenji</li>
                                <li><strong>GitHub:</strong> github.com/okamura-kenji</li>
                                <li><strong>電話:</strong> 090-1234-5678</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            {
                title: "スキル・強み",
                content: `
                    <div class="slide-content">
                        <div>
                            <h2>コアスキル</h2>
                            <div class="strengths-grid">
                                <div class="strength-item">
                                    <h4>戦略的思考</h4>
                                    <p>市場分析と仮説検証に基づく施策立案</p>
                                </div>
                                <div class="strength-item">
                                    <h4>データ分析</h4>
                                    <p>KPI設計、効果測定、改善アクションの提示</p>
                                </div>
                                <div class="strength-item">
                                    <h4>コミュニケーション</h4>
                                    <p>意図が伝わる構成と具体例で説明する力</p>
                                </div>
                                <div class="strength-item">
                                    <h4>プロジェクト推進</h4>
                                    <p>部門横断の合意形成と期限内の遂行</p>
                                </div>
                                <div class="strength-item">
                                    <h4>プレゼンテーション</h4>
                                    <p>目的志向で、相手に合わせた説得設計</p>
                                </div>
                                <div class="strength-item">
                                    <h4>CRM運用</h4>
                                    <p>顧客データ活用と継続率向上の改善提案</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>実績ハイライト</h2>
                            <ul>
                                <li><strong>売上向上:</strong> 主要案件の売上前年比120%を達成</li>
                                <li><strong>リード創出:</strong> デジタル施策で新規リード150%増加</li>
                                <li><strong>プロジェクト:</strong> 年10件規模のマーケ施策を計画・実行</li>
                                <li><strong>チーム育成:</strong> 5名メンバーの成長支援と役割最適化</li>
                                <li><strong>プロセス改善:</strong> 業務効率を約30%向上</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            {
                title: "職歴・経歴",
                content: `
                    <div class="slide-content single-column">
                        <h2>キャリアタイムライン</h2>
                        <div class="timeline-item">
                            <div class="timeline-period">2019年4月 - 2021年12月</div>
                            <h4>株式会社XYZ - EC事業担当</h4>
                            <p>EC事業の運営・改善を担当。商品企画から販売戦略まで幅広く経験し、売上向上に貢献。</p>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-period">2022年1月 - 現在</div>
                            <h4>株式会社DEF企画 - EC事業マネージャー</h4>
                            <p>EC事業部門の責任者として、チーム運営と事業戦略立案を担当。売上目標を3年連続で達成し、部門売上を前年比120%向上。</p>
                        </div>
                    </div>
                `
            },
            {
                title: "自己分析結果",
                content: `
                    <div class="slide-content">
                        <div>
                            <h2>性格特性（自己認識）</h2>
                            <div class="analysis-summary">
                                <div class="summary-item">
                                    <h4>外向性</h4>
                                    <p>新しい環境への適応が早く、関係構築に前向き</p>
                                </div>
                                <div class="summary-item">
                                    <h4>協調性</h4>
                                    <p>チームの成果最大化を重視し、他者視点を大切にする</p>
                                </div>
                                <div class="summary-item">
                                    <h4>誠実性</h4>
                                    <p>目標達成への継続的な努力と計画性を備える</p>
                                </div>
                                <div class="summary-item">
                                    <h4>学習志向</h4>
                                    <p>新しい技術・知識の習得を楽しみ、改善サイクルを回す</p>
                                </div>
                                <div class="summary-item">
                                    <h4>レジリエンス</h4>
                                    <p>失敗や変化を学習機会と捉え、早期に立て直す</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>価値観（意思決定の軸）</h2>
                            <div class="analysis-summary">
                                <div class="summary-item">
                                    <h4>顧客成功</h4>
                                    <p>成果と満足の両立を最優先にする</p>
                                </div>
                                <div class="summary-item">
                                    <h4>成長・学習</h4>
                                    <p>継続的な改善と新規スキルの獲得を重視</p>
                                </div>
                                <div class="summary-item">
                                    <h4>透明性</h4>
                                    <p>データに基づく説明責任と率直なコミュニケーション</p>
                                </div>
                                <div class="summary-item">
                                    <h4>長期志向</h4>
                                    <p>短期的成果より、持続可能な信頼関係を築く</p>
                                </div>
                                <div class="summary-item">
                                    <h4>貢献意識</h4>
                                    <p>チーム・事業・社会へのプラスの影響にこだわる</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                title: "スキル・専門性",
                content: `
                    <div class="slide-content">
                        <div>
                            <h2>EC事業運営スキル</h2>
                            <ul>
                                <li><strong>商品企画:</strong> 市場ニーズに基づく商品企画・開発</li>
                                <li><strong>在庫管理:</strong> 効率的な在庫管理と需要予測</li>
                                <li><strong>顧客対応:</strong> 顧客満足度向上のためのサービス改善</li>
                                <li><strong>データ分析:</strong> 売上データ分析による改善施策立案</li>
                                <li><strong>プロジェクト管理:</strong> チーム連携による効率的な業務推進</li>
                            </ul>
                        </div>
                        <div>
                            <h2>ビジネススキル</h2>
                            <ul>
                                <li><strong>戦略立案:</strong> 事業戦略の策定と実行</li>
                                <li><strong>チーム運営:</strong> メンバーのモチベーション向上</li>
                                <li><strong>問題解決:</strong> 課題の特定と効果的な解決策の実行</li>
                                <li><strong>コミュニケーション:</strong> 社内外との円滑な連携</li>
                                <li><strong>改善提案:</strong> 業務プロセスの継続的な改善</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            {
                title: "キャリアビジョン",
                content: `
                    <div class="slide-content">
                        <div>
                            <h2>キャリア目標</h2>
                            <div class="vision-item">
                                <h4>短期目標（1-2年）</h4>
                                <p>EC事業運営スキルを深化させ、データドリブンな意思決定を推進</p>
                            </div>
                            <div class="vision-item">
                                <h4>中期目標（3-5年）</h4>
                                <p>EC事業部門のリーダーとして、チーム全体の成果向上に貢献</p>
                            </div>
                            <div class="vision-item">
                                <h4>長期目標（5年以上）</h4>
                                <p>事業戦略に深く関わり、企業の成長を牽引するEC事業責任者</p>
                            </div>
                        </div>
                        <div>
                            <h2>成長への取り組み</h2>
                            <ul>
                                <li><strong>デジタル領域:</strong> 最新のEC運営ツールと手法の習得</li>
                                <li><strong>データ分析:</strong> SQL、Python等を活用した高度な分析スキル</li>
                                <li><strong>リーダーシップ:</strong> チーム育成とマネジメント能力の強化</li>
                                <li><strong>戦略思考:</strong> 事業全体を俯瞰した戦略立案力の向上</li>
                                <li><strong>業界知識:</strong> EC市場動向と競合分析の深化</li>
                                <li><strong>グローバル視点:</strong> 国際的な視野での事業戦略構築</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            {
                title: "まとめ",
                content: `
                    <div class="slide-content single-column">
                        <h2>私の価値提案</h2>
                        <div class="summary-points">
                            <div class="summary-point">
                                <h4>🎯 戦略的思考力</h4>
                                <p>市場分析と仮説検証に基づく施策立案で、確実な成果を創出</p>
                            </div>
                            <div class="summary-point">
                                <h4>📊 データドリブン</h4>
                                <p>KPI設計から効果測定まで、数値に基づく継続的な改善サイクル</p>
                            </div>
                            <div class="summary-point">
                                <h4>🤝 チーム推進力</h4>
                                <p>部門横断の合意形成と、メンバーの成長を支援するリーダーシップ</p>
                            </div>
                            <div class="summary-point">
                                <h4>🚀 学習志向</h4>
                                <p>変化に適応し、新しい知識とスキルを積極的に習得する姿勢</p>
                            </div>
                            <div class="summary-point">
                                <h4>💡 顧客成功</h4>
                                <p>顧客の成功を第一に考え、長期的な価値創造を追求</p>
                            </div>
                        </div>
                        <div class="cta-section">
                            <p class="cta-text">これらの強みを活かし、貴社のマーケティング戦略の推進と事業成長に貢献いたします。</p>
                        </div>
                    </div>
                `
            }
        ];
        
        this.renderSlides();
    }
    
    renderSlides() {
        if (!this.slidesWrapper) return;
        
        this.slidesWrapper.innerHTML = this.slides.map((slide, index) => `
            <div class="slide" data-slide="${index}">
                ${slide.subtitle ? `<h3>${slide.subtitle}</h3>` : ''}
                <h2>${slide.title}</h2>
                ${slide.content}
            </div>
        `).join('');
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        if (this.fullscreenBtn) {
            this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
        
        // キーボードナビゲーション
        document.addEventListener('keydown', (e) => {
            if (this.isInViewport()) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prevSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case 'Escape':
                        if (document.fullscreenElement) {
                            document.exitFullscreen();
                        }
                        break;
                }
            }
        });
    }
    
    isInViewport() {
        if (!this.slidesWrapper) return false;
        const rect = this.slidesWrapper.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlidePosition();
            this.updateUI();
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.currentSlide++;
            this.updateSlidePosition();
            this.updateUI();
        }
    }
    
    updateSlidePosition() {
        if (this.slidesWrapper) {
            const translateX = -this.currentSlide * 100;
            this.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        }
    }
    
    updateUI() {
        // スライドカウンターの更新
        if (this.slideCounter) {
            this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.slides.length}`;
        }
        
        // ボタンの状態更新
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.slides.length - 1;
        }
    }
    
    toggleFullscreen() {
        const viewer = document.querySelector('.presentation-viewer');
        if (!viewer) return;
        
        if (!document.fullscreenElement) {
            viewer.requestFullscreen().catch(err => {
                console.log(`フルスクリーンエラー: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// スムーズスクロール関数
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    
    const headerHeight = header.offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// パフォーマンス最適化のためのスロットル関数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// イベントリスナーの設定
function initEventListeners() {
    // ハンバーガーメニュー
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // ナビゲーションリンク
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // スクロールイベント（パフォーマンス最適化）
    window.addEventListener('scroll', throttle(() => {
        handleScroll();
        handleScrollAnimation();
    }, 16));
    
    // リサイズイベント
    window.addEventListener('resize', throttle(() => {
        // モバイルメニューが開いている場合は閉じる
        if (navMenu && window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, 250));
    
    // 外部クリックでモバイルメニューを閉じる
    document.addEventListener('click', (e) => {
        if (navMenu && hamburger && 
            navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    });
}

// ページ読み込み完了時の初期化
function initializeApp() {
    console.log('岡村研嗣ポータルサイトが正常に読み込まれました。');
    
    // イベントリスナーの設定
    initEventListeners();
    
    // プレゼンテーションビューアの初期化
    const presentationSection = document.querySelector('.presentation');
    if (presentationSection) {
        new PresentationViewer();
    }
    
    // 初期スクロールアニメーション
    handleScrollAnimation();
    
    // fade-inクラスを要素に追加
    const animatedElements = document.querySelectorAll('.section-header, .profile-content, .career-timeline, .analysis-grid, .skills-grid, .portfolio-grid, .contact-methods');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Apple風の滑らかなスクロールリビール
    const revealTargets = document.querySelectorAll(
        'section, .summary-item, .hobby-category, .artist-category, .section-header, .profile-content, .skills-grid, .portfolio-grid'
    );
    revealTargets.forEach(el => el.classList.add('fade-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
            if (isIntersecting) {
                target.classList.add('in-view');
                observer.unobserve(target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });

    revealTargets.forEach(el => observer.observe(el));
    
    // 初期アクティブリンクの設定
    updateActiveNavLinkOnScroll();
}

// DOMContentLoaded イベント
document.addEventListener('DOMContentLoaded', initializeApp);

// ページ表示時（戻るボタンなど）
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        initializeApp();
    }
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript エラーが発生しました:', e.error);
});

// 未処理のPromise拒否をキャッチ
window.addEventListener('unhandledrejection', (e) => {
    console.error('未処理のPromise拒否:', e.reason);
    e.preventDefault();
});

// パフォーマンス監視（開発用）
if (window.performance && window.performance.mark) {
    window.addEventListener('load', () => {
        window.performance.mark('app-loaded');
        const loadTime = window.performance.now();
        console.log(`ページ読み込み時間: ${loadTime.toFixed(2)}ms`);
    });
}

// 自己分析セクションの詳細表示切り替え
function toggleAnalysisDetails() {
    const detailsSection = document.querySelector('.analysis-details');
    const toggleButton = document.querySelector('.analysis-toggle-btn');
    
    if (detailsSection && toggleButton) {
        const isVisible = detailsSection.style.display !== 'none';
        
        if (isVisible) {
            detailsSection.style.display = 'none';
            toggleButton.textContent = '詳細分析を表示';
            toggleButton.setAttribute('aria-expanded', 'false');
        } else {
            detailsSection.style.display = 'block';
            toggleButton.textContent = '詳細分析を非表示';
            toggleButton.setAttribute('aria-expanded', 'true');
            
            // スムーズスクロールで詳細セクションまで移動
            setTimeout(() => {
                detailsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    }
}