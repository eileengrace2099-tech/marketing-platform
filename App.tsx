
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, Sparkles, Plus, History, Archive, Menu, X as CloseIcon, Database, FileText, Video, Mic, Lightbulb, Users as UsersIcon, LogOut, Lock, Briefcase } from 'lucide-react';

import Dashboard from './pages/Dashboard.tsx';
import ProductList from './pages/ProductList.tsx';
import SchemaEditor from './pages/SchemaEditor.tsx';
import AIStudio from './pages/AIStudio.tsx';
import AIHistory from './pages/AIHistory.tsx';
import AssetRepo from './pages/AssetRepo.tsx';
import BVPromptRepo from './pages/BVPromptRepo.tsx';
import GoodCopyRepo from './pages/GoodCopyRepo.tsx';
import GoodScriptRepo from './pages/GoodScriptRepo.tsx';
import CreativeRepo from './pages/CreativeRepo.tsx';
import OralScriptGenerator from './pages/OralScriptGenerator.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import Login from './pages/Login.tsx';

import { Product, FieldDefinition, PromptTemplate, GoodAsset, AdCampaign, CreativeAsset, User, UserPermissions } from './types.ts';
import { DEFAULT_FIELDS, DEFAULT_CATEGORIES, STORAGE_KEYS, ADMIN_PERMISSIONS, DEFAULT_JOB_TITLES } from './constants.ts';

const Sidebar = ({ isOpen, setIsOpen, user, onLogout }: { isOpen: boolean; setIsOpen: (v: boolean) => void, user: User, onLogout: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = useMemo(() => {
    const items = [
      { path: '/', icon: LayoutDashboard, label: '數據總覽', key: 'dashboard' as keyof UserPermissions },
      { path: '/products', icon: Package, label: '產品資料庫', key: 'products' as keyof UserPermissions },
      { path: '/creative-repo', icon: Lightbulb, label: '好創意資料庫', key: 'creativeRepo' as keyof UserPermissions },
      { path: '/copy-repo', icon: FileText, label: '好文案資料庫', key: 'copyRepo' as keyof UserPermissions },
      { path: '/script-repo', icon: Video, label: '好腳本資料庫', key: 'scriptRepo' as keyof UserPermissions },
      { path: '/oral-script', icon: Mic, label: '口播稿生成器', key: 'oralScript' as keyof UserPermissions },
      { path: '/assets', icon: Archive, label: '產品資產歸檔', key: 'assets' as keyof UserPermissions },
      { path: '/bv-repo', icon: Database, label: 'BV 語法庫', key: 'bvRepo' as keyof UserPermissions },
      { path: '/settings', icon: Settings, label: '系統設定', key: 'settings' as keyof UserPermissions },
      { path: '/ai-studio', icon: Sparkles, label: 'AI 創意中心', key: 'aiStudio' as keyof UserPermissions },
      { path: '/history', icon: History, label: '生成記錄', key: 'dashboard' as keyof UserPermissions },
    ];

    return items.filter(item => user.permissions[item.key] !== 'NONE');
  }, [user]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-rose-50 text-rose-900 min-h-screen p-6 flex flex-col shadow-inner border-r border-rose-100
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between lg:justify-start gap-3 mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="bg-rose-500 p-2 rounded-xl shadow-lg shadow-rose-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight italic text-rose-600">PLAN PRO</h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-rose-400">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive(item.path) 
                  ? 'bg-rose-500 text-white shadow-md translate-x-1' 
                  : 'text-rose-400 hover:bg-rose-100 hover:text-rose-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          ))}

          {user.role === 'ADMIN' && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 mt-6 border border-dashed ${
                isActive('/admin') 
                  ? 'bg-slate-800 text-white border-slate-800' 
                  : 'text-slate-400 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <UsersIcon className="w-5 h-5" />
              <span className="font-bold text-sm">權限與職務管理</span>
            </Link>
          )}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-rose-100 space-y-4">
          <div className="px-4 py-3 bg-white/50 rounded-2xl border border-rose-100">
             <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">目前登入</p>
             <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-black text-slate-700 truncate">{user.name}</p>
                <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.5 rounded-md font-bold">{user.title}</span>
             </div>
             <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 text-rose-400 hover:text-rose-600 font-bold transition-all text-sm"
          >
            <LogOut className="w-4 h-4" /> 登出系統
          </button>
          <p className="text-[9px] text-rose-300 text-center font-medium italic">企劃部管理系統 v1.9 (Member Info)</p>
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
  const [bvPrompts, setBvPrompts] = useState<PromptTemplate[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [goodCopy, setGoodCopy] = useState<GoodAsset[]>([]);
  const [goodScripts, setGoodScripts] = useState<GoodAsset[]>([]);
  const [creatives, setCreatives] = useState<CreativeAsset[]>([]);
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const storedFields = localStorage.getItem(STORAGE_KEYS.FIELDS);
    const storedPrompts = localStorage.getItem(STORAGE_KEYS.PROMPT_TEMPLATES);
    const storedBvPrompts = localStorage.getItem(STORAGE_KEYS.BV_PROMPTS);
    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const storedGoodCopy = localStorage.getItem(STORAGE_KEYS.GOOD_COPY);
    const storedGoodScripts = localStorage.getItem(STORAGE_KEYS.GOOD_SCRIPTS);
    const storedCreatives = localStorage.getItem(STORAGE_KEYS.CREATIVE_REPO);
    const storedAdCampaigns = localStorage.getItem(STORAGE_KEYS.AD_CAMPAIGNS);
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const storedJobTitles = localStorage.getItem(STORAGE_KEYS.JOB_TITLES);

    const storedCurrentUser = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER) || localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    if (storedProducts) setProducts(JSON.parse(storedProducts));
    if (storedPrompts) setPrompts(JSON.parse(storedPrompts));
    if (storedBvPrompts) setBvPrompts(JSON.parse(storedBvPrompts));
    if (storedGoodCopy) setGoodCopy(JSON.parse(storedGoodCopy));
    if (storedGoodScripts) setGoodScripts(JSON.parse(storedGoodScripts));
    if (storedCreatives) setCreatives(JSON.parse(storedCreatives));
    if (storedAdCampaigns) setAdCampaigns(JSON.parse(storedAdCampaigns));
    
    if (storedJobTitles) {
      setJobTitles(JSON.parse(storedJobTitles));
    } else {
      setJobTitles(DEFAULT_JOB_TITLES);
      localStorage.setItem(STORAGE_KEYS.JOB_TITLES, JSON.stringify(DEFAULT_JOB_TITLES));
    }

    let userList: User[] = storedUsers ? JSON.parse(storedUsers) : [];
    if (!userList.find(u => u.email === 'admin')) {
      const admin: User = {
        id: 'admin_id',
        email: 'admin',
        name: '超級管理員',
        title: '系統管理員',
        role: 'ADMIN',
        status: 'APPROVED',
        permissions: ADMIN_PERMISSIONS,
        createdAt: Date.now()
      };
      userList = [admin, ...userList];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(userList));
    }
    setUsers(userList);

    if (storedCurrentUser) {
      const user = JSON.parse(storedCurrentUser) as User;
      const syncedUser = userList.find(u => u.id === user.id);
      if (syncedUser && syncedUser.status === 'APPROVED') {
        setCurrentUser(syncedUser);
      } else {
        setCurrentUser(null);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(DEFAULT_CATEGORIES);
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    }

    if (storedFields) {
      setFields(JSON.parse(storedFields));
    } else {
      setFields(DEFAULT_FIELDS);
      localStorage.setItem(STORAGE_KEYS.FIELDS, JSON.stringify(DEFAULT_FIELDS));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => { if (isLoaded) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products)); }, [products, isLoaded]);
  useEffect(() => { if (isLoaded) localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)); }, [users, isLoaded]);
  useEffect(() => { if (isLoaded) localStorage.setItem(STORAGE_KEYS.FIELDS, JSON.stringify(fields)); }, [fields, isLoaded]);
  useEffect(() => { if (isLoaded) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories)); }, [categories, isLoaded]);
  useEffect(() => { if (isLoaded) localStorage.setItem(STORAGE_KEYS.GOOD_COPY, JSON.stringify(goodCopy)); }, [goodCopy, isLoaded]);
  useEffect(() => { if (isLoaded) localStorage.setItem(STORAGE_KEYS.GOOD_SCRIPTS, JSON.stringify(goodScripts)); }, [goodScripts, isLoaded]);
  useEffect(() => { if (isLoaded) localStorage.setItem(STORAGE_KEYS.CREATIVE_REPO, JSON.stringify(creatives)); }, [creatives, isLoaded]);
  useEffect(() => { if (isLoaded) localStorage.setItem(STORAGE_KEYS.JOB_TITLES, JSON.stringify(jobTitles)); }, [jobTitles, isLoaded]);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  if (!isLoaded) return null;

  return (
    <Router>
      {!currentUser ? (
        <Login setUsers={setUsers} users={users} setCurrentUser={setCurrentUser} />
      ) : (
        <div className="flex min-h-screen font-sans antialiased text-slate-800 bg-pink-50/20 overflow-x-hidden">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} user={currentUser} onLogout={handleLogout} />
          
          <main className="flex-1 overflow-y-auto">
            <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-rose-100 sticky top-0 z-30">
               <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                 <Menu className="w-6 h-6" />
               </button>
               <h1 className="text-lg font-black text-rose-600">PLAN PRO</h1>
               <div className="w-10"></div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
              <Routes>
                <Route path="/" element={<Dashboard products={products} />} />
                <Route path="/products" element={<ProductList products={products} setProducts={setProducts} fields={fields} categories={categories} user={currentUser} />} />
                <Route path="/creative-repo" element={<CreativeRepo products={products} creatives={creatives} setCreatives={setCreatives} user={currentUser} />} />
                <Route path="/copy-repo" element={<GoodCopyRepo products={products} assets={goodCopy} setAssets={setGoodCopy} user={currentUser} />} />
                <Route path="/script-repo" element={<GoodScriptRepo products={products} assets={goodScripts} setAssets={setGoodScripts} user={currentUser} />} />
                <Route path="/oral-script" element={<OralScriptGenerator products={products} adCampaigns={adCampaigns} setAdCampaigns={setAdCampaigns} user={currentUser} />} />
                <Route path="/assets" element={<AssetRepo products={products} setProducts={setProducts} prompts={prompts} setPrompts={setPrompts} user={currentUser} />} />
                <Route path="/bv-repo" element={<BVPromptRepo prompts={bvPrompts} setPrompts={setBvPrompts} user={currentUser} />} />
                <Route path="/settings" element={<SchemaEditor fields={fields} setFields={setFields} categories={categories} setCategories={setCategories} user={currentUser} />} />
                <Route path="/ai-studio" element={<AIStudio products={products} setProducts={setProducts} prompts={[...prompts, ...bvPrompts]} user={currentUser} />} />
                <Route path="/history" element={<AIHistory />} />
                {currentUser.role === 'ADMIN' && (
                  <Route path="/admin" element={<AdminPanel users={users} setUsers={setUsers} jobTitles={jobTitles} setJobTitles={setJobTitles} />} />
                )}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      )}
    </Router>
  );
};

export default App;