import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, Menu, X as CloseIcon, Users as UsersIcon, LogOut, Shield } from 'lucide-react';

// 核心功能頁面
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import SchemaEditor from './pages/SchemaEditor';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';

import { Product, FieldDefinition, User, UserPermissions } from './types';
import { DEFAULT_FIELDS, DEFAULT_CATEGORIES, STORAGE_KEYS, ADMIN_PERMISSIONS, DEFAULT_JOB_TITLES } from './constants';

const Sidebar = ({ isOpen, setIsOpen, user, onLogout }: { isOpen: boolean; setIsOpen: (v: boolean) => void, user: User, onLogout: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = useMemo(() => {
    return [
      { path: '/', icon: LayoutDashboard, label: '數據總覽', key: 'dashboard' as keyof UserPermissions },
      { path: '/products', icon: Package, label: '產品資料庫', key: 'products' as keyof UserPermissions },
      { path: '/settings', icon: Settings, label: '欄位自定義', key: 'settings' as keyof UserPermissions },
      { path: '/admin', icon: Shield, label: '帳號管理', key: 'dashboard' as keyof UserPermissions, adminOnly: true },
    ].filter(item => {
        if (item.adminOnly && user.role !== 'ADMIN') return false;
        return user.permissions[item.key] !== 'NONE';
    });
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
              <Package className="w-6 h-6 text-white" />
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
  const [categories, setCategories] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const storedFields = localStorage.getItem(STORAGE_KEYS.FIELDS);
    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const storedJobTitles = localStorage.getItem(STORAGE_KEYS.JOB_TITLES);
    const storedCurrentUser = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER) || localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    if (storedProducts) setProducts(JSON.parse(storedProducts));
    
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
                <Route path="/settings" element={<SchemaEditor fields={fields} setFields={setFields} categories={categories} setCategories={setCategories} user={currentUser} />} />
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